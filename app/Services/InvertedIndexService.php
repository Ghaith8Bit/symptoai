<?php

namespace App\Services;

use Closure;
use RuntimeException;
use App\Models\Doctor;
use MessagePack\MessagePack;
use TextAnalysis\Stemmers\PorterStemmer;
use TextAnalysis\Tokenizers\GeneralTokenizer;

class InvertedIndexService
{
    // Instance properties
    private array $index = [];
    private array $docData = [];
    private array $idf = [];
    private array $config;
    private array $stemCache = [];

    private GeneralTokenizer $tokenizer;
    private PorterStemmer $stemmer;

    public function __construct()
    {
        $this->config = config('search.index');
        $this->config['stopwords'] = array_flip($this->config['stopwords']);
        $this->initializeComponents();
    }

    private function initializeComponents(): void
    {
        $this->tokenizer = new GeneralTokenizer();
        $this->stemmer = app($this->config['stemmer']);
    }

    /**
     * Static method to load the index from a file.
     */
    public function loadIndex(): void
    {
        $path = config('search.index.path');

        if (!file_exists($path)) {
            throw new RuntimeException("Index file not found: {$path}");
        }

        $content = file_get_contents($path);

        if ($this->config['gzip_compression'] ?? false) {
            $content = gzdecode($content);
        }

        $data = $this->config['serialization'] === 'msgpack'
            ? MessagePack::unpack($content)
            : unserialize($content);

        // Load data into the instance
        $this->index = $data['index'];
        $this->docData = $data['docData'];
        $this->idf = $data['idf'];
    }

    /**
     * Build the index from all Doctor records.
     */
    public function buildIndex(Closure $progressCallback = null): void
    {
        $this->resetIndex();
        $start = microtime(true);

        Doctor::with('specialities')->chunkById(
            $this->config['chunk_size'],
            function ($doctors) use ($progressCallback) {
                foreach ($doctors as $doctor) {
                    $this->addDocument($doctor);
                }
                $progressCallback?->call($this, count($doctors));
            }
        );

        $this->computeStatistics();
        logger()->info('Index built', [
            'time' => round(microtime(true) - $start, 2),
            'documents' => count($this->docData),
            'terms' => count($this->index)
        ]);
    }

    /**
     * Add a document to the index.
     */
    private function addDocument(Doctor $doctor): void
    {
        $tokens = $this->processText($this->getDocumentText($doctor));
        if (empty($tokens)) return;

        $docId = $doctor->id;
        $tokenCounts = array_count_values($tokens);
        $docLength = count($tokens);

        // Store document metadata
        $this->docData[$docId] = [
            'length' => $docLength,
            'norm' => 0.0,
        ];

        // Update inverted index
        foreach ($tokenCounts as $token => $count) {
            $this->index[$token][$docId] = $count;
        }
    }

    /**
     * Get the text content for a document.
     */
    private function getDocumentText(Doctor $doctor): string
    {
        return implode(' ', [
            $doctor->name,
            $doctor->address,
            $doctor->specialities->pluck('name')->implode(' ')
        ]);
    }

    /**
     * Process text into tokens.
     */
    private function processText(string $text): array
    {
        // Preprocess text
        $text = strtr(mb_strtolower($text), $this->config['replacements']);
        $tokens = $this->tokenizer->tokenize($text);

        $processed = [];
        foreach ($tokens as $token) {
            // Clean token
            $token = preg_replace('/[^\p{L}\p{N}]+/u', '', $token);
            if ($token === '' || isset($this->config['stopwords'][$token])) {
                continue;
            }

            // Stem with caching
            $processed[] = $this->cachedStem($token);
        }

        return $processed;
    }

    /**
     * Cache stems for tokens.
     */
    private function cachedStem(string $token): string
    {
        return $this->stemCache[$token] ??= $this->stemmer->stem($token);
    }

    /**
     * Compute IDF and document norms.
     */
    private function computeStatistics(): void
    {
        $totalDocs = count($this->docData);

        // Compute IDF and document vectors
        foreach ($this->index as $token => $documents) {
            $df = count($documents);
            $this->idf[$token] = log($totalDocs / ($df + 1)) + 1;

            foreach ($documents as $docId => $count) {
                $tf = $count / $this->docData[$docId]['length'];
                $this->docData[$docId]['norm'] += pow($tf * $this->idf[$token], 2);
            }
        }

        // Finalize document norms
        foreach ($this->docData as $docId => $data) {
            $this->docData[$docId]['norm'] = sqrt($data['norm']);
        }
    }

    /**
     * Search the index.
     */
    public function search(string $query, int $limit = null): array
    {
        $start = microtime(true);
        $tokens = $this->processText($query);
        if (empty($tokens)) return [];

        $queryVector = $this->getQueryVector($tokens);
        $results = $this->scoreDocuments($queryVector);

        logger()->debug('Search performed', [
            'time' => round(microtime(true) - $start, 4),
            'query' => $query,
            'results' => count($results)
        ]);

        return $results;
    }

    /**
     * Compute the query vector.
     */
    private function getQueryVector(array $tokens): array
    {
        $vector = [];
        $totalTerms = count($tokens);
        $termFreqs = array_count_values($tokens);

        foreach ($termFreqs as $term => $count) {
            if ($idf = $this->idf[$term] ?? null) {
                $vector[$term] = ($count / $totalTerms) * $idf;
            }
        }

        return $vector;
    }

    /**
     * Score documents for a query.
     */
    private function scoreDocuments(array $queryVector): array
    {
        $scores = [];
        $queryNorm = sqrt(array_sum(array_map(fn($v) => $v ** 2, $queryVector)));
        if ($queryNorm < 0.0001) return [];

        // Find candidate documents
        $candidates = [];
        foreach (array_keys($queryVector) as $term) {
            foreach ($this->index[$term] ?? [] as $docId => $count) {
                $candidates[$docId] = true;
            }
        }

        // Score candidates
        foreach (array_keys($candidates) as $docId) {
            $score = 0;
            foreach ($queryVector as $term => $qWeight) {
                if ($docCount = $this->index[$term][$docId] ?? null) {
                    $tf = $docCount / $this->docData[$docId]['length'];
                    $dWeight = $tf * $this->idf[$term];
                    $score += $qWeight * $dWeight;
                }
            }

            $docNorm = $this->docData[$docId]['norm'] ?: 1;
            $finalScore = $score / ($queryNorm * $docNorm);

            if ($finalScore >= config('search.search.score_threshold')) {
                $scores[$docId] = $finalScore;
            }
        }

        arsort($scores);
        return array_slice($scores, 0, $limit ?? config('search.search.max_results'), true);
    }

    /**
     * Save the index to a file.
     */
    public function saveIndex(string $path): void
    {
        $data = [
            'index' => $this->index,
            'docData' => $this->docData,
            'idf' => $this->idf,
            'config' => $this->config,
        ];

        $content = $this->config['serialization'] === 'msgpack'
            ? MessagePack::pack($data)
            : serialize($data);

        if ($this->config['gzip_compression'] ?? false) {
            $content = gzencode($content, 6);
        }

        file_put_contents($path, $content);
    }

    /**
     * Reset the index.
     */
    private function resetIndex(): void
    {
        $this->index = [];
        $this->docData = [];
        $this->idf = [];
        $this->stemCache = [];
    }

    /**
     * Update a document in the index.
     */
    public function updateDocument(Doctor $doctor): void
    {
        $this->removeDocument($doctor->id);
        $this->addDocument($doctor);
        $this->computeStatistics();
    }

    /**
     * Remove a document from the index.
     */
    private function removeDocument(int $docId): void
    {
        foreach ($this->index as $term => &$docs) {
            unset($docs[$docId]);
            if (empty($docs)) unset($this->index[$term]);
        }
        unset($this->docData[$docId]);
    }

    /**
     * Get index statistics.
     */
    public function getStats(): array
    {
        $docCount = count($this->docData);
        $totalLength = array_sum(array_column($this->docData, 'length'));
        $avgLength = $docCount > 0 ? $totalLength / $docCount : 0;

        return [
            'documents' => $docCount,
            'tokens' => count($this->index),
            'avg_doc_length' => $avgLength,
            'memory_usage' => memory_get_usage(true),
        ];
    }

    /**
     * Get index data for debugging.
     */
    public function getIndexData(): array
    {
        return [
            'index' => $this->index,
            'docData' => $this->docData,
            'idf' => $this->idf,
        ];
    }
}

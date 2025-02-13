<?php

namespace App\Console\Commands;

use App\Models\Doctor;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Services\InvertedIndexService;

class BuildInvertedIndex extends Command
{
    protected $signature = 'index:build
                            {--force : Force rebuild even if index exists}
                            {--chunk=200 : Number of records to process at once}
                            {--debug : Show detailed processing information}';

    protected $description = 'Build and store the inverted index for doctors';

    public function handle(): void
    {
        $startTime = microtime(true);
        $indexService = new InvertedIndexService();
        $filePath = config('search.index.path');

        try {
            if (!$this->shouldRebuild($filePath)) {
                return;
            }

            $this->configureIndexing();

            $this->info('Building inverted index...');
            $this->buildIndexWithProgress($indexService);

            $this->saveIndex($indexService, $filePath);
            $this->showResults($indexService, $startTime);

            Log::info('Inverted index built successfully', [
                'execution_time' => microtime(true) - $startTime,
                'file_size' => filesize($filePath),
            ]);
        } catch (\Throwable $e) {
            $this->handleError($e);
        }
    }

    private function shouldRebuild(string $filePath): bool
    {
        if (!$this->option('force') && file_exists($filePath)) {
            return $this->confirm('Index exists. Rebuild?');
        }
        return true;
    }

    private function configureIndexing(): void
    {
        if ($this->option('chunk')) {
            config(['search.index.chunk_size' => (int)$this->option('chunk')]);
        }
    }

    private function buildIndexWithProgress(InvertedIndexService $service): void
    {
        $totalDoctors = Doctor::count();
        $progressBar = $this->output->createProgressBar($totalDoctors);
        $progressBar->setFormat('verbose');

        $processedCount = 0; // Track cumulative progress

        $service->buildIndex(function ($chunkProcessed) use ($progressBar, &$processedCount) {
            $processedCount += $chunkProcessed; // Update cumulative progress
            $progressBar->setProgress($processedCount);
        });

        $progressBar->finish();
        $this->newLine();
    }

    private function saveIndex(InvertedIndexService $service, string $path): void
    {
        $this->info('Saving index...');
        $service->saveIndex($path);
        $this->info('Index saved to: ' . $path);
    }

    private function showResults(InvertedIndexService $service, float $startTime): void
    {
        $this->newLine(2);
        $this->showStatistics($service, $startTime);

        if ($this->option('debug')) {
            $this->showDebugInfo($service);
        }
    }

    protected function showStatistics(InvertedIndexService $service, float $startTime): void
    {
        $stats = $service->getStats();
        $executionTime = microtime(true) - $startTime;

        $this->table(
            ['Metric', 'Value'],
            [
                ['Documents Indexed', number_format($stats['documents'])],
                ['Unique Tokens', number_format($stats['tokens'])],
                ['Avg Doc Length', number_format($stats['avg_doc_length'], 2)],
                ['Memory Usage', $this->formatBytes($stats['memory_usage'])],
                ['Execution Time', number_format($executionTime, 2) . 's'],
            ]
        );
    }

    protected function showDebugInfo(InvertedIndexService $service): void
    {
        $indexData = $service->getIndexData();
        $this->info("\nDebug Information:");
        $this->line('First 5 index entries:');

        $this->table(
            ['Token', 'Document Count'],
            array_slice(array_map(
                fn($token, $docs) => [$token, count($docs)],
                array_keys($indexData['index']),
                array_values($indexData['index'])
            ), 0, 5)
        );
    }

    protected function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    private function handleError(\Throwable $e): void
    {
        $this->error('Error building index: ' . $e->getMessage());
        Log::error('Index build failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        throw $e;
    }
}

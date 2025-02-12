<?php

use TextAnalysis\Stemmers\PorterStemmer;

return [
    'index' => [
        'chunk_size' => 500,
        'stopwords' => include resource_path('stopwords/en.php'),
        'stemmer' => PorterStemmer::class,
        'replacements' => ['-' => ' ', "'" => ''],
        'normalization' => 'cosine',
        'serialization' => 'msgpack',
        'cache_size' => 1000,
        'gzip_compression' => true,
        'path' => storage_path('app/index/inverted_index.dat')
    ],
    'search' => [
        'max_results' => 100,
        'score_threshold' => 0.01,
    ]
];

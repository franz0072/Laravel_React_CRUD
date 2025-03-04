<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Adjust as needed
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],  // Set your frontend URL instead of '*'
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];

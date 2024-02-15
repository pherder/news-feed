<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Illuminate\Http\JsonResponse;

class FeedGetAvailableSettingsController
{
    public function __invoke(): JsonResponse
    {
        $possibleSettings = [
            'preferredSources' => Source::getSources(),
            'preferredAuthors' => Author::getAuthors(),
            'preferredCategories' => Category::getCategories(),
        ];

        return response()->json($possibleSettings);
    }
}

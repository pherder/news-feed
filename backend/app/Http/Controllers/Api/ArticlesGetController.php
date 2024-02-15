<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Services\ArticleSearch\ArticleSearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticlesGetController
{
    public function __construct(private readonly ArticleSearchService $articleSearchService)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();
        $keyword = $request->input('keyword');
        $publishedDate = $request->input('publishedDate');

        $articles = $this->articleSearchService->search($user, $keyword, $publishedDate);

        return response()->json($articles);
    }
}

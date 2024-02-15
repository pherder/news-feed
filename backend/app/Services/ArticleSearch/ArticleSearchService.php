<?php

declare(strict_types=1);

namespace App\Services\ArticleSearch;

use App\Models\Article;
use App\Models\FeedSettings;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ArticleSearchService
{
    public function search(
        ?User $user,
        ?string $keyword = null,
        ?string $publishedDate = null,
    ): Collection {
        $query = Article::query();

        if ($user) {
            /** @var ?FeedSettings $userFeedSettings */
            $userFeedSettings = $user->userSetting()->first()?->getFeedSettings();

            if ($userFeedSettings) {
                if (!empty($userFeedSettings->preferredSources)) {
                    $query->whereIn('source_id', array_values($userFeedSettings->preferredSources));
                }

                if (!empty($userFeedSettings->preferredCategories)) {
                    $query->whereHas('categories', function ($q) use ($userFeedSettings) {
                        $q->whereIn('categories.id', array_values($userFeedSettings->preferredCategories));
                    });
                }

                if (!empty($userFeedSettings->preferredAuthors)) {
                    $query->whereHas('authors', function ($q) use ($userFeedSettings) {
                        $q->whereIn('authors.id', array_values($userFeedSettings->preferredAuthors));
                    });
                }
            }
        }

        if (!empty($keyword)) {
            $query->where(function ($q) use ($keyword) {
                $q
                    ->where('title', 'like', "%{$keyword}%")
                    ->orWhere('content', 'like', "%{$keyword}%");
            });
        }

        if (!empty($publishedDate)) {
            $query->whereDate('original_date', '=', $publishedDate);
        }

        return $query->with(['categories', 'source', 'authors'])->get();
    }
}

<?php

declare(strict_types=1);

namespace App\Services\ArticleFetcher;

use App\Dto\RawArticleDto;
use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Throwable;

class ArticleFetcherService
{
    /** @var ArticleFetcherInterface[] */
    protected array $fetchers = [];

    public function __construct(array $fetchers)
    {
        $this->fetchers = $fetchers;
    }

    public function fetchAll(): int
    {
        $processedArticles = 0;

        foreach ($this->fetchers as $fetcher) {
            $articles = $fetcher->fetch();

            foreach ($articles as $article) {
                $this->processArticle($article);
                $processedArticles++;
            }
        }

        return $processedArticles;
    }

    private function processArticle(RawArticleDto $dto): void
    {
        $source = Source::firstOrCreate([
            'name' => $dto->source
        ]);

        $article = new Article();
        $article->title = $dto->articleTitle;
        $article->content = $dto->articleContent;
        $article->original_date = $dto->publishDate;
        $article->source()->associate($source);
        $article->save();

        foreach ($dto->categories as $item) {
            $category = Category::firstOrCreate([
                'name' => $item
            ]);
            try {
                $article->categories()->attach($category);
            } catch (Throwable) {
            }
        }

        foreach ($dto->authors as $item) {
            $author = Author::firstOrCreate([
                'name' => $item
            ]);
            try {
                $article->authors()->attach($author);
            } catch (Throwable) {
            }
        }
    }
}


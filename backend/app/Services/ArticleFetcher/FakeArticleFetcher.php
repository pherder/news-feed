<?php

declare(strict_types=1);

namespace App\Services\ArticleFetcher;

use App\Dto\RawArticleDto;

class FakeArticleFetcher implements ArticleFetcherInterface
{
    public function __construct(private readonly FakeDataProvider $provider)
    {
    }

    public function fetch(): array
    {
        $articles = [];
        for ($i = 0; $i < 10; $i++) {
            $articles[] = $this->createFakeArticle();
        }

        return $articles;
    }

    public function createFakeArticle(): RawArticleDto
    {
        return new RawArticleDto(
            articleTitle: substr(fake()->text, 0, 15),
            articleContent: fake()->text,
            publishDate: fake()->dateTimeBetween('-3 days')->format('Y-m-d'),
            source: 'FakeSource',
            categories: $this->provider->provideCategories(rand(1, 3)),
            authors: $this->provider->provideAuthors(rand(1, 2))
        );
    }
}

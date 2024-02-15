<?php

declare(strict_types=1);

namespace App\Services\ArticleFetcher;

class FakeDataProvider
{
    private const AUTHORS = [
        'John', 'Paul', 'Chris', 'Eva', 'Martha'
    ];

    /** @return string[] */
    public function provideCategories(int $count): array
    {
        $categories = [];

        for ($i = 0; $i < $count; $i++) {
            $randomNumber = rand(1, 10);
            $categories[] = "Category $randomNumber";
        }

        return $categories;
    }

    public function provideAuthors(int $count): array
    {
        $authors = [];
        for ($i = 0; $i < $count; $i++) {
            $randomKey = array_rand(self::AUTHORS);
            $authors[] = self::AUTHORS[$randomKey];
        }

        return $authors;
    }
}

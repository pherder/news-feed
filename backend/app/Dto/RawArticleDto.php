<?php

declare(strict_types=1);

namespace App\Dto;

class RawArticleDto
{
    public function __construct(
        public readonly string $articleTitle,
        public readonly string $articleContent,
        public readonly string $publishDate,
        public readonly string $source,
        /** @param string[] $categories */
        public readonly array $categories,
        /** @param string[] $authors */
        public readonly array $authors,
    ) {
    }
}

<?php

declare(strict_types=1);

namespace App\Services\ArticleFetcher;

use App\Dto\RawArticleDto;

interface ArticleFetcherInterface
{
    /** @return RawArticleDto[] */
    public function fetch(): array;
}

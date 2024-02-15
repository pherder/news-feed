<?php

declare(strict_types=1);

namespace App\Models;

class FeedSettings
{
    public array $preferredSources = [];
    public array $preferredAuthors = [];
    public array $preferredCategories = [];

    public function __construct($attributes = [])
    {
        if (!empty($attributes)) {
            $this->preferredSources = $attributes['preferredSources'] ?? [];
            $this->preferredAuthors = $attributes['preferredAuthors'] ?? [];
            $this->preferredCategories = $attributes['preferredCategories'] ?? [];
        }
    }

    public function toArray(): array
    {
        return [
            'preferredSources' => $this->preferredSources,
            'preferredAuthors' => $this->preferredAuthors,
            'preferredCategories' => $this->preferredCategories,
        ];
    }
}

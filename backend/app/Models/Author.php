<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    protected $fillable = [
        'name',
    ];

    public static function getAuthors(): array
    {
        return self::query()
            ->get(['name', 'id'])
            ->pluck('id', 'name')
            ->toArray();
    }

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Source extends Model
{
    protected $fillable = [
        'name',
    ];

    public static function getSources(): array
    {
        return self::query()
            ->get(['name', 'id'])
            ->pluck('id', 'name')
            ->toArray();
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}

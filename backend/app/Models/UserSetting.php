<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    protected $fillable = [
        'user_id'
    ];

    protected $casts = [
        'feed_settings' => 'array',
    ];

    public function getFeedSettings(): FeedSettings
    {
        return new FeedSettings($this->feed_settings ??  []);
    }

    public function setFeedSettings(mixed $value): self
    {
        if ($value instanceof FeedSettings) {
            $this->feed_settings = $value->toArray();
        } else {
            $this->feed_settings = $value;
        }

        return $this;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

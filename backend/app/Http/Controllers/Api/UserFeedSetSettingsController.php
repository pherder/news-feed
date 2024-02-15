<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\FeedSettings;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFeedSetSettingsController
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        $feedSettingsData = $request->input('data');
        $feedSettings = new FeedSettings($feedSettingsData);

        $user->userSetting()->firstOrNew(['user_id' => $user->id])->setFeedSettings($feedSettings)->save();


        return response()->json(['message' => 'Settings updated successfully']);
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFeedGetSettingsController
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $settings = $user->userSetting()->firstOrNew();

        return response()->json(
            $settings->getFeedSettings()
        );
    }
}

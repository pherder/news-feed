<?php

use App\Http\Controllers\Api\ArticlesGetController;
use App\Http\Controllers\Api\FeedGetAvailableSettingsController;
use App\Http\Controllers\Api\UserFeedGetSettingsController;
use App\Http\Controllers\Api\UserRegisterController;
use App\Http\Controllers\Api\UserLoginController;
use App\Http\Controllers\Api\UserFeedSetSettingsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

// Public routes
Route::get('/articles', ArticlesGetController::class);
Route::post('/register', UserRegisterController::class);
Route::post('/login', UserLoginController::class);

// Protected route
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/feed-settings', UserFeedGetSettingsController::class);
    Route::put('/user/feed-settings', UserFeedSetSettingsController::class);
    Route::post('/user/feed-settings', UserFeedSetSettingsController::class);
    Route::get('/user/feed-settings/available', FeedGetAvailableSettingsController::class);
});

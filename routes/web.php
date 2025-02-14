<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name('welcome');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard')->name('dashboard')->middleware('role.redirect');

    Route::get('/chatbot', fn() => Inertia::render('AI/Diagnosis'))->name('ai.diagnosis')->middleware('role:user');
    Route::get('/expertsystem', fn() => Inertia::render('Expert/ExpertSystem'))->name('expert.expertsystem')->middleware('role:user');
    Route::get('/expertType', fn() => Inertia::render('Expert/ExpertType'))->name('expert.experttype')->middleware('role:user');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(
    [
        'prefix' => 'doctors',
        'as' => 'doctors.',
        'controller' => DoctorController::class,
        'middleware' => ['auth', 'role:user']
    ],
    function () {
        Route::get('/', 'index')->name('index');
    }
);

Route::group(
    [
        'prefix' => 'contacts',
        'as' => 'contacts.',
        'controller' => ContactController::class,
        'middleware' => ['auth']
    ],
    function () {
        Route::get('/', 'index')->name('index')->middleware('role:admin,editor');
        Route::post('/', 'send')->name('send')->middleware('throttle:3,1');
    }
);

Route::group(
    [
        'prefix' => 'blogs',
        'as' => 'blogs.',
        'controller' => BlogController::class,
        'middleware' => ['auth']
    ],
    function () {
        Route::get('/', 'index')->name('index')->middleware('role:admin,editor');
        Route::post('/', 'store')->name('store')->middleware('role:admin,editor');
        Route::delete('/{blog}', 'destroy')->name('destroy')->middleware('role:admin,editor');
    }
);

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
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

Route::get('/', HomeController::class);

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard')->name('dashboard')->middleware('role.redirect');

    Route::get('/medical-record', fn() => Inertia::render('Medical/Record'))->name('medical.record');
    Route::get('/chatbot', fn() => Inertia::render('AI/Diagnosis'))->name('ai.diagnosis');
    Route::get('/find-doctor', fn() => Inertia::render('Doctors/FindDoctor'))->name('doctors.find.doctor');
    Route::get('/expertsystem', fn() => Inertia::render('Expert/ExpertSystem'))->name('expert.expertsystem');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(
    [
        'prefix' => 'contact',
        'as' => 'contact.',
        'controller' => ContactController::class
    ],
    function () {
        Route::post('/contact', 'send')->name('send')->middleware('throttle:3,1');
    }
);

Route::group(
    [
        'prefix' => 'blog',
        'as' => 'blog.',
        'controller' => BlogController::class
    ],
    function () {
        Route::get('/', 'index')->name('index');
    }
);

require __DIR__ . '/auth.php';

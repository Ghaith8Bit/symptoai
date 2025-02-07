<?php

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/medical-record', fn() => Inertia::render('Medical/Record'))->name('medical.record');
    Route::get('/chatbot', fn() => Inertia::render('Chat/Chatbot'))->name('chat.chatbot');
    Route::get('/find-doctor', fn() => Inertia::render('Doctores/FindDoctor'))->name('doctores.find.doctor');
    Route::get('/homepage', fn() => Inertia::render('Home/Homepage'))->name('home.homepage');
    Route::get('/expertsystem', fn() => Inertia::render('Expert/ExpertSystem'))->name('expert.expertsystem');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

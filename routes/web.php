<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\BeasiswaController;
use App\Http\Controllers\Admin\LombaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// PUBLIC ROUTES
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/lomba/{slug}', [HomeController::class, 'detailLomba'])->name('lomba.detail');
Route::get('/beasiswa/{slug}', [HomeController::class, 'detailBeasiswa'])->name('beasiswa.detail');

// ADMIN ROUTES 
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', fn () => Inertia::render('Dashboard'))->name('dashboard');

        Route::resource('beasiswa', BeasiswaController::class);
        Route::resource('lomba', LombaController::class);

        Route::controller(ProfileController::class)->group(function () {
            Route::get('/profile', 'edit')->name('profile.edit');
            Route::patch('/profile', 'update')->name('profile.update');
            Route::delete('/profile', 'destroy')->name('profile.destroy');
        });
    });

require __DIR__.'/auth.php';
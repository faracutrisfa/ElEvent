<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\BeasiswaController;
use App\Http\Controllers\Admin\LombaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('index');

    Route::get('/beasiswa', [BeasiswaController::class, 'index'])->name('beasiswa.index');
    Route::get('/lomba', [LombaController::class, 'index'])->name('lomba.index');
});

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::resource('beasiswa', BeasiswaController::class);
    Route::resource('lomba', LombaController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // ✅ ADD THIS
    Route::inertia('factories', 'factories/index')->name('factories.index');
});

require __DIR__.'/settings.php';
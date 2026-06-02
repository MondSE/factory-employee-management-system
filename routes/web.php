<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FactoryController;


Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('/dashboard', fn () => inertia('dashboard'))->name('dashboard');

    // FACTORIES
    Route::get('/factories', [FactoryController::class, 'index'])->name('factories.index');
    Route::get('/factories/create', [FactoryController::class, 'create'])->name('factories.create');

    Route::get('/factories/{id}', [FactoryController::class, 'show'])->name('factories.show');
    Route::get('/factories/{id}/edit', [FactoryController::class, 'edit'])->name('factories.edit');

    Route::post('/factories', [FactoryController::class, 'store'])->name('factories.store');
    Route::put('/factories/{id}', [FactoryController::class, 'update'])->name('factories.update');
    Route::delete('/factories/{id}', [FactoryController::class, 'destroy'])->name('factories.destroy');
});
require __DIR__.'/settings.php';
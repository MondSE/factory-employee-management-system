<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FactoryController;
use App\Http\Controllers\EmployeeController;


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

    // EMPLOYEES
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');

    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');

    Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('employees.show');

    Route::get('/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');

    Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('employees.update');

    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
    });
require __DIR__.'/settings.php';
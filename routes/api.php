<?php

use Illuminate\Support\Facades\Route;


Route::get('/employees', [EmployeeApiController::class, 'index']);
Route::post('/employees', [EmployeeApiController::class, 'store']);
Route::put('/employees/{id}', [EmployeeApiController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeApiController::class, 'destroy']);
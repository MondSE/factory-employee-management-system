<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Factory;
use App\Models\Employee;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Dashboard', [
            'factoryCount' => Factory::count(),
            'employeeCount' => Employee::count(),
        ]);
    }
}

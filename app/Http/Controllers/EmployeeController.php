<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Factory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees
     */
    public function index(Request $request)
    {
        $query = Employee::with('factory');

        // optional search
        if ($request->search) {
            $query->where('firstname', 'like', "%{$request->search}%")
                  ->orWhere('lastname', 'like', "%{$request->search}%");
        }

        return Inertia::render('employees/index', [
            'employees' => $query->latest()->paginate(10),
            'filters' => $request->only(['search']),
            'factories' => Factory::select('id', 'factory_name')->get(),
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('employees/create', [
            'factories' => Factory::all(),
        ]);
    }

    /**
     * Store employee
     */
    public function store(StoreEmployeeRequest $request)
    {
        Employee::create($request->validated());

        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully');
    }

    /**
     * Show employee details
     */
    public function show(string $id)
    {
        $employee = Employee::with('factory')->findOrFail($id);

        return Inertia::render('employees/show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show edit form
     */
    public function edit(string $id)
    {
        $employee = Employee::findOrFail($id);

        return Inertia::render('employees/edit', [
            'employee' => $employee,
            'factories' => Factory::all(),
        ]);
    }

    /**
     * Update employee
     */
    public function update(UpdateEmployeeRequest $request, string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($request->validated());

        return redirect()->route('employees.index')
            ->with('success', 'Employee updated successfully');
    }

    /**
     * Delete employee
     */
    public function destroy(string $id)
    {
        Employee::findOrFail($id)->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully');
    }
}
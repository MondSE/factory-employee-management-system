<?php

namespace App\Http\Controllers;

use App\Models\Factory;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreFactoryRequest;
use App\Http\Requests\UpdateFactoryRequest;

class FactoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Factory::query();

        // optional search (nice for exam points)
        if ($request->search) {
            $query->where('factory_name', 'like', "%{$request->search}%")
                  ->orWhere('location', 'like', "%{$request->search}%");
        }

        return Inertia::render('factories/index', [
            'factories' => $query->latest()->paginate(10),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show create page (optional if using modal in React)
     */
    public function create()
    {
        return Inertia::render('factories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFactoryRequest $request)
    {
        Factory::create($request->validated());

        return redirect()->route('factories.index')
            ->with('success', 'Factory created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $factory = Factory::with('employees')->findOrFail($id);

        return Inertia::render('factories/show', [
            'factory' => $factory,
        ]);
    }

    /**
     * Show edit form
     */
    public function edit(string $id)
    {
        $factory = Factory::findOrFail($id);

        return Inertia::render('factories/edit', [
            'factory' => $factory,
        ]);
    }

    /**
     * Update resource
     */
    public function update(UpdateFactoryRequest $request, string $id)
    {
        $factory = Factory::findOrFail($id);
        $factory->update($request->validated());

        return redirect()->route('factories.index')
            ->with('success', 'Factory updated successfully');
    }

    /**
     * Delete resource
     */
    public function destroy(string $id)
    {
        Factory::findOrFail($id)->delete();

        return redirect()->route('factories.index')
            ->with('success', 'Factory deleted successfully');
    }
}
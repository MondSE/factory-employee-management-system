<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee; // ✅ REQUIRED

class EmployeeApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with('factory');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('firstname', 'like', "%{$request->search}%")
                  ->orWhere('lastname', 'like', "%{$request->search}%");
            });
        }

        return response()->json([
            'employees' => $query->latest()->paginate(10),
        ]);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}
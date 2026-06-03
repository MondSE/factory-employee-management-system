<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Factory;
use Illuminate\Database\Eloquent\Factories\Factory as BaseFactory;

class EmployeeFactory extends BaseFactory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'position' => 'Worker',
            'factory_id' => Factory::factory(),
        ];
    }
}
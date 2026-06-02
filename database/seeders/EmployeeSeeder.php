<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Factory;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $factories = Factory::all();

        foreach ($factories as $factory) {

            for ($i = 1; $i <= 20; $i++) {
                Employee::create([
                    'firstname' => "Emp{$factory->id}_{$i}",
                    'lastname' => "Worker",
                    'email' => "emp{$factory->id}_{$i}@mail.com",
                    'phone' => "09" . rand(100000000, 999999999),
                    'factory_id' => $factory->id,
                ]);
            }
        }
    }
}
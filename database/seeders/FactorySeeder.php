<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Factory;

class FactorySeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 30; $i++) {
            Factory::create([
                'factory_name' => "Factory {$i}",
                'location' => "Location {$i}",
                'email' => "factory{$i}@mail.com",
                'website' => "https://factory{$i}.com",
            ]);
        }
    }
}
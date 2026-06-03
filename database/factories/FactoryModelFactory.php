<?php

namespace Database\Factories;

use App\Models\FactoryModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactoryModelFactory extends Factory
{
    protected $model = FactoryModel::class;

    public function definition(): array
    {
        return [
            'factory_name' => fake()->company(),
            'location' => fake()->city(),
            'email' => fake()->safeEmail(),
            'website' => fake()->url(),
        ];
    }
}
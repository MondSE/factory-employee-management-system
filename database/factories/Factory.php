<?php

namespace Database\Factories;

use App\Models\Factory;
use Illuminate\Database\Eloquent\Factories\Factory as BaseFactory;

class FactoryFactory extends BaseFactory
{
    protected $model = Factory::class;

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
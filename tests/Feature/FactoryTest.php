<?php

namespace Tests\Feature;

use App\Models\FactoryModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FactoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_factory()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/factories', [
            'factory_name' => 'Test Factory',
            'location' => 'Manila',
            'email' => 'test@example.com',
            'website' => 'https://test.com',
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('factories', [
            'factory_name' => 'Test Factory',
        ]);
    }

    public function test_user_can_update_factory()
    {
        $user = User::factory()->create();
        $factory = FactoryModel::factory()->create();

        $response = $this->actingAs($user)->put("/factories/{$factory->id}", [
            'factory_name' => 'Updated Factory',
            'location' => $factory->location,
            'email' => $factory->email,
            'website' => $factory->website,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('factories', [
            'factory_name' => 'Updated Factory',
        ]);
    }

    public function test_user_can_delete_factory()
    {
        $user = User::factory()->create();
        $factory = FactoryModel::factory()->create();

        $response = $this->actingAs($user)->delete("/factories/{$factory->id}");

        $response->assertStatus(302);

        $this->assertDatabaseMissing('factories', [
            'id' => $factory->id,
        ]);
    }
}
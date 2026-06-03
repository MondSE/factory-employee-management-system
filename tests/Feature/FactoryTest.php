<?php

namespace Tests\Feature;

use App\Models\Factory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FactoryTest extends TestCase
{
    public function test_authenticated_user_can_create_factory()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/factories', [
            'factory_name' => 'Test Factory',
            'location' => 'Angeles City',
            'email' => 'factory@test.com',
            'website' => 'https://factory.test',
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('factories', [
            'factory_name' => 'Test Factory',
            'location' => 'Angeles City',
        ]);
    }

    public function test_user_can_view_factories_list()
    {
        $user = User::factory()->create();
        Factory::factory()->count(3)->create();

        $response = $this->actingAs($user)->get('/factories');

        $response->assertStatus(200);
    }

    public function test_user_can_update_factory()
    {
        $user = User::factory()->create();
        $factory = Factory::factory()->create();

        $response = $this->actingAs($user)->put("/factories/{$factory->id}", [
            'factory_name' => 'Updated Factory',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('factories', [
            'id' => $factory->id,
            'factory_name' => 'Updated Factory',
        ]);
    }

    public function test_user_can_delete_factory()
    {
        $user = User::factory()->create();
        $factory = Factory::factory()->create();

        $response = $this->actingAs($user)->delete("/factories/{$factory->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('factories', [
            'id' => $factory->id,
        ]);
    }
}
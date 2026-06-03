<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\FactoryModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_employee()
    {
        $user = User::factory()->create();
        $factory = FactoryModel::factory()->create();

        $response = $this->actingAs($user)->post('/employees', [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '123456789',
            'factory_id' => $factory->id,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('employees', [
            'email' => 'john@example.com',
        ]);
    }

}
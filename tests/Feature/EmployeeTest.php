<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Employee;
use App\Models\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    public function test_create_employee()
    {
        $user = User::factory()->create();
        $factory = Factory::factory()->create();

        $response = $this->actingAs($user)->post('/employees', [
            'name' => 'John Doe',
            'factory_id' => $factory->id,
            'position' => 'Worker',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'name' => 'John Doe',
        ]);
    }

    public function test_update_employee()
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create();

        $response = $this->actingAs($user)->put("/employees/{$employee->id}", [
            'name' => 'Updated Name',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'id' => $employee->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_delete_employee()
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create();

        $response = $this->actingAs($user)->delete("/employees/{$employee->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('employees', [
            'id' => $employee->id,
        ]);
    }
}
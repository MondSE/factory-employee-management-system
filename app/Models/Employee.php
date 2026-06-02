<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Services\ModelEventService;

class Employee extends Model
{
    //
    protected $fillable = [
        'firstname', 'lastname', 'factory_id', 'email', 'phone'
    ];

    public function factory()
    {
        return $this->belongsTo(Factory::class);
    }

    protected static function booted()
    {
        static::created(function ($employee) {
            ModelEventService::log('created', $employee);
        });

        static::updated(function ($employee) {
            ModelEventService::log('updated', $employee, $employee->getOriginal());
        });

        static::deleted(function ($employee) {
            ModelEventService::log('deleted', $employee);
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Services\ModelEventService;

class Factory extends Model
{
    //
    protected $fillable = [
        'factory_name', 'location', 'email', 'website'
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    protected static function booted()
    {
        static::created(fn ($model) => ModelEventService::log('created', $model));
        static::updated(fn ($model) => ModelEventService::log('updated', $model));
        static::deleted(fn ($model) => ModelEventService::log('deleted', $model));
    }
}

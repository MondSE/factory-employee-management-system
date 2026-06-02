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
    static::created(function ($model) {
        ModelEventService::log('created', $model);
    });

    static::updated(function ($model) {
        ModelEventService::log(
            'updated',
            $model,
            $model->getOriginal() // 👈 important
        );
    });

    static::deleted(function ($model) {
        ModelEventService::log('deleted', $model);
    });
}
}

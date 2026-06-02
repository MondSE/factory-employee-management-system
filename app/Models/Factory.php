<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}

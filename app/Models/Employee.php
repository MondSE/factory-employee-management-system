<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}

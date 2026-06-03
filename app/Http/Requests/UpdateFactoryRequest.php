<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFactoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'factory_name' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'website' => ['nullable', 'string'],
        ];
    }
}
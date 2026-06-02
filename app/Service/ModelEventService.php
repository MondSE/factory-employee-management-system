<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class ModelEventService
{
    public static function log($event, $model)
    {
        $data = [
            'event' => $event,
            'model' => get_class($model),
            'record_id' => $model->id,
            'user_id' => auth()->id(),
        ];

        // Only capture changes on update
        if ($event === 'updated') {
            $data['changes'] = [
                'old' => $model->getOriginal(),
                'new' => $model->getChanges(),
            ];
        }

        Log::info('MODEL EVENT LOG', $data);
    }
}
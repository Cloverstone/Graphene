<?php

/**
 * This is a great UUID generator package available on Composer
 * but you can generate your UUID however you see fit.
 */
use Jenssegers\Mongodb\Model as Eloquent;
use Rhumsaa\Uuid\Uuid;

class UuidModel extends Eloquent
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;


    protected $primaryKey = 'hash';

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        /**
         * Attach to the 'creating' Model Event to provide a UUID
         * for the `id` field (provided by $model->getKeyName())
         */
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string)$model->generateNewId();
            //$model->hash = (string)$model->generateNewId();
        });
    }

    /**
     * Get a new version 4 (random) UUID.
     *
     * @return \Rhumsaa\Uuid\Uuid
     */
    public function generateNewId()
    {
        return Uuid::uuid4();
    }
}
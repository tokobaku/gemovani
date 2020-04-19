<?php

namespace App\Location;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string locale
 * @property int location_id
 */
class LocationTranslation extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['locale', 'title', 'description', 'location_id'];

    /**
     * @return HasOne
     */
    public function location(): HasOne
    {
        return $this->hasOne(Location::class);
    }
}

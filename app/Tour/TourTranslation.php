<?php

namespace App\Tour;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class TourTranslation
 * Translation of Tour entity
 * @see Tour
 * @property Tour tour
 */
class TourTranslation extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = [
        'tour_id',
        'locale',
        'title',
        'description'
    ];

    /**
     * @return HasOne
     */
    public function tour(): HasOne
    {
        return $this->hasOne(Tour::class);
    }
}

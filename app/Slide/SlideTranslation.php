<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Slide;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class SlideTranslation
 * Model for slide translation
 * @property BelongsTo slide
 * @property int slide_id
 */
class SlideTranslation extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['slide_id', 'content', 'locale'];

    /**
     * @return BelongsTo
     */
    public function slide()
    {
        return $this->belongsTo(Slide::class);
    }
}

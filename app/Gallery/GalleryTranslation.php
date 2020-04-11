<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Gallery;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class GalleryTranslation
 * GalleryTranslation entity
 * @method static where(array $array)
 * @property string locale
 * @property string title
 */
class GalleryTranslation extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['locale', 'gallery_id', 'title', 'description'];

    /**
     * @return HasOne
     */
    public function gallery()
    {
        return $this->hasOne(Gallery::class);
    }
}

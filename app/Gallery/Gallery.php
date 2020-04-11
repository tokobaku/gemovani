<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Gallery;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Gallery
 * Gallery entity
 * @property int id
 * @property string url_key
 * @property GalleryTranslation[] translations
 * @property string items
 * @method static where(string $string, $entityIds)
 */
class Gallery extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['url_key'];

    /**
     * @return HasMany
     */
    public function translations()
    {
        return $this->hasMany(GalleryTranslation::class);
    }

    /**
     * @param string $locale
     * @param array $data
     * @return GalleryTranslation
     */
    public function translateOrNew($locale, $data)
    {
        $galleryTranslation = GalleryTranslation::where('locale', $locale)
            ->where('gallery_id', $this->id)
            ->first();

        if (!$galleryTranslation) {
            $galleryTranslation = new GalleryTranslation();
        }

        $galleryTranslation->fill($data);
        $galleryTranslation->gallery_id = $this->id;
        $galleryTranslation->save();

        return $galleryTranslation;
    }

    /**
     * @param $locale
     * @return GalleryTranslation|null
     */
    public function getTranslation(string $locale = 'en')
    {
        foreach ($this->translations as $translation) {
            if ($translation['locale'] === $locale) {
                return $translation;
            }
        }

        return null;
    }

    /**
     * @param array $translationsData
     * @return Gallery
     * @throws Exception
     */
    public function saveTranslations(array $translationsData)
    {
        foreach ($translationsData as $locale => $translationData) {
            $translation = $this->getTranslation($locale) ?? new GalleryTranslation();

            $translation->fill($translationData)->save();
        }

        $this->removeExtraTranslations($translationsData);

        return $this;
    }

    /**
     * @param array $translationsData
     * @throws Exception
     */
    public function removeExtraTranslations(array $translationsData)
    {
        $this->refresh();

        foreach ($this->translations as $translation) {
            if (!isset($translationsData[$translation->locale])) {
                $translation->delete();
            }
        }
    }
}

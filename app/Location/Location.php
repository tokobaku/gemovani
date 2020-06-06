<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Location;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Location
 * Location entity
 * @property int id
 * @property string cover_image
 * @property LocationTranslation[] translations
 */
class Location extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['url_key', 'longitude', 'latitude', 'cover_image'];

    /**
     * @return HasMany
     */
    public function translations(): HasMany
    {
        return $this->hasMany(LocationTranslation::class);
    }

    /**
     * @param string $locale
     * @param array $data
     * @return LocationTranslation
     */
    public function translateOrNew($locale, $data)
    {
        $locationTranslation = LocationTranslation::where('locale', $locale)
            ->where('location_id', $this->id)
            ->first();

        if (!$locationTranslation) {
            $locationTranslation = new LocationTranslation();
        }

        $locationTranslation->fill($data);
        $locationTranslation->location_id = $this->id;
        $locationTranslation->save();

        return $locationTranslation;
    }

    /**
     * @param $locale
     * @return LocationTranslation|null
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
     * @return Location
     * @throws Exception
     */
    public function saveTranslations(array $translationsData)
    {
        foreach ($translationsData as $locale => $translationData) {
            $translation = $this->getTranslation($locale) ?? new LocationTranslation();
            $translation->location_id = $this->id;

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

<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Tour;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Exception;

/**
 * Class Tour
 * Model for Tour entity
 * @property TourTranslation translations
 * @property int id
 * @method static Tour findOrFail($get)
 */
class Tour extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['url_key', 'start_date', 'end_date', 'cover_image'];

    /**
     * @return HasMany
     */
    public function translations(): HasMany
    {
        return $this->hasMany(TourTranslation::class);
    }

    /**
     * @param string $locale
     * @param array $data
     * @return TourTranslation
     */
    public function translateOrNew($locale, $data)
    {
        $tourTranslation = TourTranslation::where('locale', $locale)
            ->where('tour_id', $this->id)
            ->first();

        if (!$tourTranslation) {
            $tourTranslation = new TourTranslation();
        }

        $tourTranslation->fill($data);
        $tourTranslation->tour_id = $this->id;
        $tourTranslation->save();

        return $tourTranslation;
    }

    /**
     * @param $locale
     * @return TourTranslation|null
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
     * @return Tour
     * @throws Exception
     */
    public function saveTranslations(array $translationsData)
    {
        foreach ($translationsData as $locale => $translationData) {
            $translation = $this->getTranslation($locale) ?? new TourTranslation();

            $translation->tour_id = $this->id;
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

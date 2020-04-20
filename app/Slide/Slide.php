<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Slide;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Exception;

/**
 * Class Slide
 * Model for slide entity
 * @property HasMany<SlideTranslation> translations
 * @property int id
 */
class Slide extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = ['image'];

    /**
     * @return HasMany
     */
    public function translations()
    {
        return $this->hasMany(SlideTranslation::class);
    }

    /**
     * @param string $locale
     * @param array $data
     * @return SlideTranslation
     */
    public function translateOrNew($locale, $data)
    {
        $slideTranslation = SlideTranslation::where('locale', $locale)
            ->where('slide_id', $this->id)
            ->first();

        if (!$slideTranslation) {
            $slideTranslation = new SlideTranslation();
        }

        $slideTranslation->fill($data);
        $slideTranslation->slide_id = $this->id;
        $slideTranslation->save();

        return $slideTranslation;
    }

    /**
     * @param $locale
     * @return SlideTranslation|null
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
     * @return Slide
     * @throws Exception
     */
    public function saveTranslations(array $translationsData)
    {
        foreach ($translationsData as $locale => $translationData) {
            $translation = $this->getTranslation($locale) ?? new SlideTranslation();

            $translation->slide_id = $this->id;
            $translation->fill(array_merge($translationData, ['locale' => $locale]))->save();
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

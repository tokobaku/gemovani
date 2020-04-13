<?php
/**
 * @author Tornike Bakuradze
 */

namespace App\Http\Requests\Helpers;

/**
 * Trait SanitizeTranslationsArray
 * Helps removing not filled translation fields from request
 * in order not to save data that is actually not needed.
 */
trait SanitizeTranslationsArray
{
    /**
     * Path to translations array in request
     * used as an argument for $this->request->get() method
     *
     * @var string $translationsField
     */
    public $translationsField = 'translations';

    /**
     * Field name that is required for each translation
     * to determine if it should be omitted or not
     *
     * @var array $requiredFields
     */
    public $requiredFields = ['title'];

    public function getSanitizedTranslations()
    {
        return array_filter(
            $this->request->get('translations'),
            function ($translation) {
                return $this->shouldBeIncluded($translation);
            }
        );
    }

    /**
     * Returns true if one of the required fields are set
     *
     * @param array $translation
     * @return bool
     */
    public function shouldBeIncluded(array $translation): bool
    {
        foreach ($this->requiredFields as $requiredField) {
            if (isset($translation[$requiredField])) {
                return true;
            }
        }

        return false;
    }
}

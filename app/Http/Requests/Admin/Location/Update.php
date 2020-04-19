<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Location;

use App\Location\Location;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Helpers\SanitizeTranslationsArray;
use Illuminate\Validation\Rule;

/**
 * Class Update
 * Validates update request of location
 * @see Location
 */
class Update extends FormRequest
{
    use SanitizeTranslationsArray;

    /**
     * Removes translations from request that are not filled
     */
    public function prepareForValidation()
    {
        $this->requiredFields = ['title', 'description'];
        $this->merge([
            'translations' => $this->getSanitizedTranslations()
        ]);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $location = Location::findOrFail($this->get('id'));

        return [
            'url_key' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('locations', 'url_key')->ignore($location->id)
            ],
            'cover_image' => 'required',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'translations.*.title' => 'required_with:translations.*.description|max:255',
            'translations.*.locale' => 'required',
            'translations.*.description' => 'required_with:translations.*.title',
            'translations.en.title' => 'required|max:255',
            'translations.en.locale' => 'required',
            'translations.en.description' => 'required'
        ];
    }

    /**
     * @inheritDoc
     */
    public function messages()
    {
        return [
            'url_key.required' => 'You must enter url key',
            'url_key.string' => 'Invalid input for url key',
            'url_key.min' => 'Url key is too short it must be at least 3 characters long',
            'url_key.max' => 'Url key length exceeds 255 characters, please use shorter one',
            'url_key.unique' => 'Tour with similar url key already exists. Please use different one',
            'cover_image.required' => 'You must select cover image',
            'longitude.required' => 'You must select location',
            'longitude.numeric' => 'You must select location',
            'latitude.required' => 'You must select location',
            'latitude.numeric' => 'You must select location',
            'translations.*.title.required' => 'You must give tour a title',
            'translations.*.title.string' => 'Invalid input for tour title',
            'translations.*.title.max' => 'Tour title is too long. Please use shorter title for tour'
        ];
    }
}

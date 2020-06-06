<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Tour;

use App\Http\Requests\Helpers\DateTimeHelper;
use App\Http\Requests\Helpers\SanitizeTranslationsArray;
use App\Http\Requests\Helpers\UrlKeyGenerator;
use App\Tour\Tour;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class Update
 * Validate update request for tour
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
            'translations' => $this->getSanitizedTranslations(),
            'url_key' => UrlKeyGenerator::toUrlKey($this->request->get('url_key'))
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
     * @inheritDoc
     */
    public function rules()
    {
        $minEndDateString = DateTimeHelper::getPreviousDateOrToday($this->request->get('start_date'));
        $tour = Tour::findOrFail($this->request->get('id'));

        return [
            'url_key' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('tours', 'url_key')->ignore($tour->id)
            ],
            'cover_image' => 'required',
            'audio' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => "required|date|after:$minEndDateString",
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
            'start_date.required' => 'You must enter the start date',
            'start_date.date' => 'Invalid format of start date',
            'end_date.required' => 'You must enter the end date',
            'end_date.date' => 'Invalid format of end date',
            'translations.*.title.required' => 'You must give tour a title',
            'translations.*.title.string' => 'Invalid input for tour title',
            'translations.*.title.max' => 'Tour title is too long. Please use shorter title for tour'
        ];
    }
}

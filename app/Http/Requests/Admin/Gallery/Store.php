<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Gallery;

use App\Http\Requests\Helpers\JsonValidator;
use App\Http\Requests\Helpers\SanitizeTranslationsArray;
use App\Http\Requests\Helpers\UrlKeyGenerator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

/**
 * Class Store
 * Validate store request for gallery
 */
class Store extends FormRequest
{
    use JsonValidator;
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
     * @inheritDoc
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
        return [
            'url_key' => 'required|string|min:3|max:255|unique:galleries',
            'translations.*.title' => 'required_with:translations.*.description|string|max:255',
            'translations.*.locale' => 'required',
            'translations.en.title' => 'required|string|max:255',
            'translations.en.locale' => 'required',
            'items' => 'required'
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $jsonString = $this->request->get('items');

            if (!$this->setJsonString($jsonString)->isArray()->jsonIsNotEmpty()->passedValidation()) {
                $validator->errors()->add('items', 'You must add items to galleries');
            }
        });
    }

    /**.
     * @inheritDoc
     */
    public function messages()
    {
        return [
            'url_key.required' => 'You must enter url key',
            'url_key.string' => 'Invalid input for url key',
            'url_key.min' => 'Url key is too short it must be at least 3 characters long',
            'url_key.max' => 'Url key length exceeds 255 characters, please use shorter one',
            'url_key.unique' => 'Gallery with similar url key already exists. Please use different one',
            'translations.*.title.required' => 'You must give gallery a title',
            'translations.*.title.string' => 'Invalid input for gallery title',
            'translations.*.title.max' => 'Gallery title is too long. Please use shorter title for gallery',
            'items.required' => 'You must add gallery items'
        ];
    }
}

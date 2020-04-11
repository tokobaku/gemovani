<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Gallery;

use App\Gallery\Gallery;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class Update
 * Validate update request for gallery
 */
class Update extends FormRequest
{
    /**
     * Removes translations that has no title
     */
    protected function prepareForValidation()
    {
        $translations = array_filter(
            $this->request->get('translations'),
            function ($translation) {
                return isset($translation['title']);
            }
        );

        $this->merge([
            'translations' => $translations
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $gallery = Gallery::findOrFail($this->request->get('id'));
        return [
            'url_key' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('galleries', 'url_key')->ignore($gallery->id)
            ],
            'translations.*.title' => 'required|string|max:255',
            'translations.*.locale' => 'required'
        ];
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
            'translations.*.title.max' => 'Gallery title is too long. Please use shorter title for gallery'
        ];
    }
}

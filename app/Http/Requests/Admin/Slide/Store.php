<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Slide;

use App\Http\Requests\Helpers\SanitizeTranslationsArray;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class Store
 * validates store request for slide
 */
class Store extends FormRequest
{
    use SanitizeTranslationsArray;

    /**
     * Removes translations from request that are not filled
     */
    public function prepareForValidation()
    {
        $this->requiredFields = ['content'];
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
        return [
            'image' => 'required',
            'translations.*.content' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Image is required!'
        ];
    }
}

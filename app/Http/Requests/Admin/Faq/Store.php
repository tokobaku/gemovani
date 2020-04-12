<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Admin\Faq;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class Store
 * Validate store request for faqs
 */
class Store extends FormRequest
{
    /**
     * Removes translations that has no title
     */
    protected function prepareForValidation()
    {
        $translations = array_filter(
            $this->request->get('translations'),
            function ($translation) {
                return isset($translation['content']);
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
     * @inheritDoc
     */
    public function rules()
    {
        return [
            'translations.*.content' => 'required_with:translations.*.locale|string',
            'translations.*.locale' => 'required'
        ];
    }

    /**.
     * @inheritDoc
     */
    public function messages()
    {
        return [
            'translations.*.content.required_with' => 'Please add FAQ',
        ];
    }
}

@php
use Illuminate\Database\Eloquent\Collection;
/** @var Collection $faqs */

/**
 * @param Collection $faqs
 * @param string $locale
 * @param string $fieldName
 * @param string|null $default
 * @return mixed
 */
function getFaqField(Collection $faqs, string $locale, string $fieldName, string $default = null)
{
    $faq = $faqs->where('locale', $locale)->first();

    if (!$faq) {
        return $default;
    }

    return $faq->{$fieldName};
}
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.faq'))

@section('content')
    <div class="Form">
        <h1>{{ __('admin.edit-faq') }}</h1>
        <form action="{{ url('/admin/faq') }}" method="POST" id="faq-form">
            @csrf
            <div class="Form-FormGroup">
                @foreach(config('gemovani.languages') as $language)
                    <div class="Expandable">
                        <input class="Expandable-Checkbox" type="checkbox" id="translation_{{ $language['code'] }}"
                               @error("translations.{$language['code']}.title") checked @enderror>
                        <label class="Expandable-Label" for="translation_{{ $language['code'] }}">{{ $language['code'] }}</label>
                        <div class="Expandable-Content">
                            <div class="Form-FormGroup">
                                <input type="hidden" name="translations[{{ $language['code'] }}][locale]"
                                       value="{{ $language['code'] }}">
                                @error("translations.{$language['code']}.title")
                                <div class="Form-ErrorMessage">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="Form-FormGroup">
                                <label class="Form-Label" for="translations_{{ $language['code'] }}_content">
                                    {{ __('admin.content') }}
                                </label>
                                <textarea class="Form-Input ToTinyMCE" id="translations_{{ $language['code'] }}_content"
                                          name="translations[{{ $language['code'] }}][content]">{{
                                          old("translations.{$language['code']}.content") ?? getFaqField($faqs, $language['code'], 'content')
                                }}</textarea>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="Form-FormGroup">
                <input type="submit" id="submit-button" value="{{ __('admin.submit') }}">
            </div>
        </form>
    </div>
@endsection

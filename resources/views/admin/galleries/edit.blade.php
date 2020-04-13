@php
/** @var \App\Gallery\Gallery $gallery */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.galleries'))

@section('content')
    <div class="Form">
        <h1>{{ __('admin.create-new-gallery') }}</h1>
        <form action="{{ url("/admin/galleries/{$gallery->id}") }}" method="POST" id="gallery-form">
            @csrf
            @method('PATCH')
            <input type="hidden" name="id" value="{{ $gallery->id }}">
            <div class="Form-FormGroup">
                @error('url_key')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <label class="Form-Label" for="url_key">{{ __('admin.url-key') }}</label>
                <input class="Form-Input" id="url_key" name="url_key" value="{{ old('url_key') ?? $gallery->url_key }}">
            </div>
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
                                <label class="Form-Label"
                                       for="translations_{{ $language['code'] }}_title">{{ __('admin.title') }}</label>
                                <input class="Form-Input" id="translations_{{ $language['code'] }}_title"
                                       name="translations[{{ $language['code'] }}][title]"
                                       value="{{ old("translations.{$language['code']}.title") ?? @$gallery->getTranslation($language['code'])->title }}">
                            </div>
                            <div class="Form-FormGroup">
                                <label class="Form-Label" for="translations_{{ $language['code'] }}_description">
                                    {{ __('admin.description') }}
                                </label>
                                <textarea class="Form-Input ToTinyMCE" id="translations_{{ $language['code'] }}_description"
                                          name="translations[{{ $language['code'] }}][description]">{{ old("translations.{$language['code']}.description") ?? @$gallery->getTranslation($language['code'])->description }}</textarea>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="Form-FormGroup">
                <input autocomplete="off" type="hidden" id="gallery-items-input" name="items" value="{{ $gallery->items }}">
                <ul class="GalleryItems" id="gallery-items"></ul>
                <input class="Form-Input Form-Input_youtube" id="selected-video" type="url"
                       placeholder="Insert youtube link" autocomplete="off">
                @error('items')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <button id="add-image">{{ __('admin.add-new-image') }}</button>
                <button id="add-video">{{ __('admin.add-new-video') }}</button>
                <input id="selected-image" type="hidden">
            </div>
            <div class="Form-FormGroup">
                <input type="submit" id="submit-button" value="{{ __('admin.submit') }}">
            </div>
        </form>
    </div>
@endsection

@section('scripts')
    @include('admin.partials.galleries.gallery-form')
@endsection

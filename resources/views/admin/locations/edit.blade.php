@php
/** @var \App\Location\Location $location */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.locations'))

@section('content')
    <div class="Form">
        <h1>{{ __('admin.create-new-location') }}</h1>
        <form action="{{ url("/admin/locations/{$location->id}") }}" method="POST" id="location-form">
            @csrf
            @method('PATCH')
            <input type="hidden" name="id" value="{{ $location->id }}">
            <div class="Form-FormGroup">
                @error('url_key')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <label class="Form-Label" for="url_key">{{ __('admin.url-key') }}</label>
                <input class="Form-Input" id="url_key" name="url_key" value="{{ old('url_key') ?? $location->url_key }}">
            </div>
            <div class="Form-FormGroup">
                @error('cover_image')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <button id="choose-image">{{ __('admin.choose-image') }}</button>
                <input class="Form-Input" id="selected-image" name="cover_image" type="hidden" value="{{ old('cover_image') ?? $location->cover_image }}">
                <div class="Form-ImageWrapper" id="image-wrapper"></div>
            </div>
            <div class="Form-FormGroup">
                @foreach(config('gemovani.languages') as $language)
                    <div class="Expandable">
                        <input class="Expandable-Checkbox" type="checkbox" id="translation_{{ $language['code'] }}"
                               @if($errors->has("translations.{$language['code']}.title") || "translations.{$language['code']}.description") checked @endif>
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
                                       value="{{ old("translations.{$language['code']}.title") ?? $location->getTranslation($language['code'])->title ?? null }}">
                            </div>
                            <div class="Form-FormGroup">
                                <label class="Form-Label" for="translations_{{ $language['code'] }}_description">
                                    {{ __('admin.description') }}
                                </label>
                                @error("translations.{$language['code']}.description")
                                <div class="Form-ErrorMessage">{{ $message }}</div>
                                @enderror
                                <textarea class="Form-Input ToTinyMCE" id="translations_{{ $language['code'] }}_description"
                                          name="translations[{{ $language['code'] }}][description]">{{ old("translations.{$language['code']}.description") ?? $location->getTranslation($language['code'])->description ?? null }}</textarea>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="Form-FormGroup">
                <div id="map" class="Map"></div>
                <input type="hidden" id="longitude" name="longitude">
                <input type="hidden" id="latitude" name="latitude">
            </div>
            <div class="Form-FormGroup">
                <input type="submit" value="{{ __('admin.submit') }}">
            </div>
        </form>
    </div>
@endsection

@section('scripts')
    @include('admin.partials.locations.location-form')
@endsection

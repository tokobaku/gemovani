@extends('admin.layout.master')

@section('documentTitle', __('admin.tours'))

@section('content')
    <div class="Form">
        <h1>{{ __('admin.create-new-tour') }}</h1>
        <form action="{{ url('/admin/tours') }}" method="POST" id="tour-form">
            @csrf
            <div class="Form-FormGroup">
                @error('url_key')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <label class="Form-Label" for="url_key">{{ __('admin.url-key') }}</label>
                <input class="Form-Input" id="url_key" name="url_key" value="{{ old('url_key') }}">
            </div>
            <div class="Form-FormGroup">
                @error('cover_image')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <button id="choose-image">{{ __('admin.choose-image') }}</button>
                <input class="Form-Input" id="selected-image" name="cover_image" type="hidden" value="{{ old('cover_image') }}">
                <div class="Form-ImageWrapper" id="image-wrapper"></div>
            </div>
            <div class="Form-FormGroup">
                <button id="choose-audio">{{ __('admin.choose-audio') }}</button>
                <input class="Form-Input" id="selected-audio" name="audio" value="{{ old('audio') }}">
            </div>
            <div class="Form-FormGroup">
                @error('start_date')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <label class="Form-Label" for="start-date">{{ __('admin.start-date') }}</label>
                <input type="date" id="start-date" name="start_date" value="{{ old('start_date') }}">
            </div>
            <div class="Form-FormGroup">
                @error('end_date')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <label class="Form-Label" for="end-date">{{ __('admin.end-date') }}</label>
                <input type="date" id="end-date" name="end_date" value="{{ old('end_date') }}">
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
                                   value="{{ old("translations.{$language['code']}.title") }}">
                        </div>
                        <div class="Form-FormGroup">
                            <label class="Form-Label" for="translations_{{ $language['code'] }}_description">
                                {{ __('admin.description') }}
                            </label>
                            <textarea class="Form-Input ToTinyMCE" id="translations_{{ $language['code'] }}_description"
                                      name="translations[{{ $language['code'] }}][description]">{{ old("translations.{$language['code']}.description") }}</textarea>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
            <div class="Form-FormGroup">
                <input type="submit" value="{{ __('admin.submit') }}">
            </div>
        </form>
    </div>
@endsection

@section('scripts')
@include('admin.partials.tours.tour-form')
@endsection

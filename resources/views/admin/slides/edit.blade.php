@extends('admin.layout.master')

@section('documentTitle', __('admin.slides'))

@section('content')
    <div class="Form">
        <h1>{{ __('admin.create-new-slide') }}</h1>
        <form action="{{ url("/admin/slides/{$slide->id}") }}" method="POST" id="slide-form">
            @csrf
            @method('PATCH')
            <input type="hidden" name="id" value="{{ $slide->id }}">
            <div class="Form-FormGroup">
                @error('image')
                <div class="Form-ErrorMessage">{{ $message }}</div>
                @enderror
                <button id="choose-image">{{ __('admin.choose-image') }}</button>
                <input class="Form-Input" id="selected-image" name="image" type="hidden" value="{{ old('image') ?? $slide->image }}">
                <div class="Form-ImageWrapper" id="image-wrapper"></div>
            </div>
            <div class="Form-FormGroup">
                @foreach(config('gemovani.languages') as $language)
                    <div class="Expandable">
                        <input class="Expandable-Checkbox" type="checkbox" id="translation_{{ $language['code'] }}"
                               @error("translations.{$language['code']}.content") checked @enderror>
                        <label class="Expandable-Label" for="translation_{{ $language['code'] }}">{{ $language['code'] }}</label>
                        <div class="Expandable-Content">
                            <div class="Form-FormGroup">
                                <label class="Form-Label" for="translations_{{ $language['code'] }}_content">
                                    {{ __('admin.content') }}
                                </label>
                                <textarea class="Form-Input ToTinyMCE" id="translations_{{ $language['code'] }}_content"
                                          name="translations[{{ $language['code'] }}][content]">{{ old("translations.{$language['code']}.content") ?? @$slide->getTranslation($language['code'])->content ?? null }}</textarea>
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
    @include('admin.partials.slides.slide-form')
@endsection

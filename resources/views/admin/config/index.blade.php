@extends('admin.layout.master')

@section('documentTitle', 'Config')

@section('content')
<form class="Form" method="POST" action="{{ url('/admin/config') }}">
    @csrf

    <div class="Form-FormGroup">
        <label class="Form-Label" for="title">{{ __('admin.title') }}</label>
        <input type="hidden" name="configs[title][key]" value="title">
        <input class="Form-Input" id="title" name="configs[title][value]"
               value="{{ old('configs.title.value') ?? @$configs['title']['value'] }}">
    </div>
    <div class="Form-FormGroup">
        <button id="gemovani-logo">{{ __('admin.gemovani-logo') }}</button>
        <input type="hidden" name="configs[gemovani_logo][key]" value="gemovani_logo">
        <input id="gemovani-logo-image" name="configs[gemovani_logo][value]" type="hidden"
               value="{{ old('configs.gemovani_logo.value') ?? @$configs['gemovani_logo']['value'] }}">
        <div class="Form-ImageWrapper" id="gemovani-logo-wrapper"></div>
    </div>
    @foreach(config('gemovani.languages') as $lang)
    <div class="Form-FormGroup">
        <input type="hidden" name="configs[about_us_{{$lang['code']}}][key]" value="about_us_{{$lang['code']}}">
        <label for="about-us-{{$lang['code']}}">About us {{$lang['code']}}</label>
        <textarea class="Form-Input ToTinyMCE" id="about-us-{{$lang['code']}}"
                  name="configs[about_us_{{$lang['code']}}][value]"
        >{{ old("configs.about_us_{$lang['code']}.value") ?? @$configs["about_us_{$lang['code']}"]['value'] }}</textarea>
    </div>
    @endforeach
    <div class="Form-FormGroup">
        <input type="submit">
    </div>
</form>
@endsection

@section('scripts')
<script>
    window.addEventListener('load', function () {
        const displayImage = file => {
            const image = document.querySelector('#image-wrapper img') || document.createElement('img');
            image.src = `/image/${file}/?w=300`;

            document.querySelector('#gemovani-logo-wrapper').innerHTML = '';
            document.querySelector('#gemovani-logo-wrapper').appendChild(image);
        };

        document.querySelector('#gemovani-logo').addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            const selectImagePopup = window.createGalleryPopup({
                inputId: 'gemovani-logo-image',
                onFileSelected: file => {
                    displayImage(file);
                }
            });

            selectImagePopup.openPopup();
        });

        // Display image if it's present
        const selectedImage = document.querySelector('#gemovani-logo-image');
        if (selectedImage.value) {
            displayImage(selectedImage.value);
        }
    });
</script>
@endsection

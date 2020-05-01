{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('backend/main.css') }}?version={{ env('VERSION') }}">
    <link rel="stylesheet" href="{{ asset('tinymce/skins/lightgray/skin.min.css') }}">
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />
    @yield('head')
    <title>@yield('documentTitle')</title>
</head>
<body>
    @yield('body')
    @include('admin.partials.header')
    <main class="Main">
        @include('admin.partials.navigation')
        <div class="Main-Content">
            @include('admin.partials.messages')
            @yield('content')
        </div>
    </main>
    <script src="{{ asset('vendor/tinymce/tinymce.min.js') }}"></script>
    <script src="{{ asset('vendor/sortable/sortable.js') }}"></script>
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
    <script src="{{ asset('backend/main.js') }}?version={{ env('VERSION') }}"></script>
    @yield('scripts')
</body>
</html>

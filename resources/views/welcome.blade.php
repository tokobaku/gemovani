<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Gemovani</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('application/main.css') }}?version={{ env('VERSION') }}">
    </head>
    <body>
        <div id="root"></div>
        <script async src="{{ asset('application/main.js') }}?version={{ env('VERSION') }}"></script>
    </body>
</html>

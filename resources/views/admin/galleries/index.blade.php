@php
/** @var Illuminate\Database\Eloquent\Collection $galleries */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.galleries'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.galleries') }}</h1>
        @if($galleries->count())
        <div>
            <form id="delete-form" method="POST" action="{{ url('/admin/galleries/delete') }}">
                @csrf
                <input type="hidden" id="entities-field" name="entities">
            </form>
            <ul class="Grid-ActionsWrapper">
                <li><a href="{{ url('/admin/galleries/create') }}">{{ __('admin.add-new-gallery') }}</a></li>
                @if($galleries->count())
                <li><button class="Grid-Action Grid-Action_danger" id="delete-all">{{ __('admin.delete') }}</button></li>
                @endif
            </ul>
        </div>
        <table>
            <thead>
                <tr>
                    <th><input class="Marker" id="mark-all" type="checkbox" name="mark_all"></th>
                    <th>{{ __('admin.id') }}</th>
                    <th>{{ __('admin.url-key') }}</th>
                    <th>{{ __('admin.title') }}</th>
                </tr>
            </thead>
            <tbody>
            @foreach($galleries as /** @var \App\Gallery\Gallery $gallery */$gallery)
                <tr>
                    <td><input class="Marker MarkEntity" type="checkbox" data-row-id="{{ $gallery->id }}"></td>
                    <td>
                        <a href="{{ url("/admin/galleries/{$gallery->id}/edit") }}">{{ $gallery->id }}</a>
                    </td>
                    <td>
                        <a href="{{ url("/admin/galleries/{$gallery->id}/edit") }}">{{ $gallery->url_key }}</a>
                    </td>
                    <td>
                        <a href="{{ url("/admin/galleries/{$gallery->id}/edit") }}">
                            {{ $gallery->getTranslation('en')->title }}
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        @else
            <h2>{{ __('admin.no-galleries-found') }}</h2>
            <h3><a href="{{ url('/admin/galleries/create') }}">{{ __('admin.add-new-one') }}</a></h3>
        @endif
    </div>
@endsection

@section('scripts')
<script>
    window.addEventListener('load', function () {
        createGrid();
    });
</script>
@endsection

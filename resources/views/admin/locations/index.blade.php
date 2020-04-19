@php
    /** @var Illuminate\Database\Eloquent\Collection $locations */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.locations'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.locations') }}</h1>
        @if($locations->count())
            <div>
                <form id="delete-form" method="POST" action="{{ url('/admin/locations/delete') }}">
                    @csrf
                    <input type="hidden" id="entities-field" name="entities">
                </form>
                <ul class="Grid-ActionsWrapper">
                    <li><a href="{{ url('/admin/locations/create') }}">{{ __('admin.add-new-location') }}</a></li>
                    @if($locations->count())
                        <li>
                            <button class="Grid-Action Grid-Action_danger"
                                    id="delete-all">{{ __('admin.delete') }}</button>
                        </li>
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
                    <th>{{ __('admin.cover-image') }}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($locations as /** @var \App\location\location $location */$location)
                    <tr>
                        <td><input class="Marker MarkEntity" type="checkbox" data-row-id="{{ $location->id }}"></td>
                        <td>
                            <a href="{{ url("/admin/locations/{$location->id}/edit") }}">{{ $location->id }}</a>
                        </td>
                        <td>
                            <a href="{{ url("/admin/locations/{$location->id}/edit") }}">{{ $location->url_key }}</a>
                        </td>
                        <td>
                            <a href="{{ url("/admin/locations/{$location->id}/edit") }}">
                                {{ $location->getTranslation('en')->title }}
                            </a>
                        </td>
                        <td>
                            <img src="/image/{{ $location->cover_image }}?w=50">
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @else
            <h2>{{ __('admin.no-locations-found') }}</h2>
            <h3><a href="{{ url('/admin/locations/create') }}">{{ __('admin.add-new-one') }}</a></h3>
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

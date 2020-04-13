@php
    /** @var Illuminate\Database\Eloquent\Collection $tours */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.tours'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.tours') }}</h1>
        @if($tours->count())
            <div>
                <form id="delete-form" method="POST" action="{{ url('/admin/tours/delete') }}">
                    @csrf
                    <input type="hidden" id="entities-field" name="entities">
                </form>
                <ul class="Grid-ActionsWrapper">
                    <li><a href="{{ url('/admin/tours/create') }}">{{ __('admin.add-new-tour') }}</a></li>
                    @if($tours->count())
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
                @foreach($tours as /** @var \App\Tour\Tour $tour */$tour)
                    <tr>
                        <td><input class="Marker MarkEntity" type="checkbox" data-row-id="{{ $tour->id }}"></td>
                        <td>
                            <a href="{{ url("/admin/tours/{$tour->id}/edit") }}">{{ $tour->id }}</a>
                        </td>
                        <td>
                            <a href="{{ url("/admin/tours/{$tour->id}/edit") }}">{{ $tour->url_key }}</a>
                        </td>
                        <td>
                            <a href="{{ url("/admin/tours/{$tour->id}/edit") }}">
                                {{ $tour->getTranslation('en')->title }}
                            </a>
                        </td>
                        <td>
                            <img src="/image/{{ $tour->cover_image }}?w=50">
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @else
            <h2>{{ __('admin.no-tours-found') }}</h2>
            <h3><a href="{{ url('/admin/tours/create') }}">{{ __('admin.add-new-one') }}</a></h3>
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

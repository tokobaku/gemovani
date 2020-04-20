@php
    /** @var Illuminate\Database\Eloquent\Collection $slides */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.slides'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.slides') }}</h1>
        @if($slides->count())
            <div>
                <form id="delete-form" method="POST" action="{{ url('/admin/slides/delete') }}">
                    @csrf
                    <input type="hidden" id="entities-field" name="entities">
                </form>
                <ul class="Grid-ActionsWrapper">
                    <li><a href="{{ url('/admin/slides/create') }}">{{ __('admin.add-new-slide') }}</a></li>
                    @if($slides->count())
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
                    <th>{{ __('admin.title') }}</th>
                    <th>{{ __('admin.image') }}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($slides as /** @var \App\slide\slide $slide */$slide)
                    <tr>
                        <td><input class="Marker MarkEntity" type="checkbox" data-row-id="{{ $slide->id }}"></td>
                        <td>
                            <a href="{{ url("/admin/slides/{$slide->id}/edit") }}">{{ $slide->id }}</a>
                        </td>
                        <td>
                            <a href="{{ url("/admin/slides/{$slide->id}/edit") }}">
                                {!! @$slide->getTranslation('en')->content ?? null !!}
                            </a>
                        </td>
                        <td>
                            <img src="/image/{{ $slide->image }}?w=50" alt="slide image">
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @else
            <h2>{{ __('admin.no-slides-found') }}</h2>
            <h3><a href="{{ url('/admin/slides/create') }}">{{ __('admin.add-new-one') }}</a></h3>
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

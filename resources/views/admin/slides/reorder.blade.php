@php
    /** @var Illuminate\Database\Eloquent\Collection $slides */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.slides'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.reorder-slides') }}</h1>
        @if($slides->count())
            <div>
                <form id="reorder-form" method="POST" action="{{ url('/admin/slides/reorder') }}">
                    @csrf
                    <input type="hidden" id="sorted-entities" name="sorted_entities">
                </form>
                <ul class="Grid-ActionsWrapper">
                    <li>
                        <button class="Grid-Action"
                                id="save-order">{{ __('admin.save-order') }}</button>
                    </li>
                </ul>
            </div>
            <table>
                <thead>
                <tr>
                    <th>{{ __('admin.id') }}</th>
                    <th>{{ __('admin.title') }}</th>
                    <th>{{ __('admin.image') }}</th>
                </tr>
                </thead>
                <tbody id="slides-wrapper">
                @foreach($slides as /** @var \App\slide\slide $slide */$slide)
                    <tr>
                        <td>
                            <input type="hidden" class="IdField" value="{{ $slide->id }}">
                            {{ $slide->id }}
                        </td>
                        <td>
                            {!! @$slide->getTranslation('en')->content ?? null !!}
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
    window.addEventListener('load', () => {
        Sortable.create(document.querySelector('#slides-wrapper'))

        document.querySelector('#save-order').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const sortedEntities = document.querySelectorAll('.IdField');
            const sortedEntityIds = [];
            sortedEntities.forEach(({ value }) => { sortedEntityIds.push(value) });
            document.querySelector('#sorted-entities').value = JSON.stringify(sortedEntityIds);

            document.querySelector('#reorder-form').submit();
        });
    });
</script>
@endsection

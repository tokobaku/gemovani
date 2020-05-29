@php
    /** @var Illuminate\Database\Eloquent\Collection $messages */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.messages'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.messages') }}</h1>
        @if($messages->count())
            <div>
                <form id="delete-form" method="POST" action="{{ url('/admin/messages/delete') }}">
                    @csrf
                    <input type="hidden" id="entities-field" name="entities">
                </form>
                <ul class="Grid-ActionsWrapper">
                    @if($messages->count())
                        <li><button class="Grid-Action Grid-Action_danger" id="delete-all">{{ __('admin.delete') }}</button></li>
                    @endif
                </ul>
                {{ $messages->links() }}
            </div>
            <table>
                <thead>
                <tr>
                    <th><input class="Marker" id="mark-all" type="checkbox" name="mark_all"></th>
                    <th>{{ __('admin.created_at') }}</th>
                    <th>{{ __('admin.email') }}</th>
                    <th>{{ __('admin.message') }}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($messages as /** @var \App\ContactMessage $message */$message)
                    <tr @if(!$message->seen_at) class="ContactMessage_notSeen" @endif>
                        <td><input class="Marker MarkEntity" type="checkbox" data-row-id="{{ $message->id }}"></td>
                        <td>
                            <a href="/admin/messages/{{ $message->id }}">{{ $message->created_at }}</a>
                        </td>
                        <td>
                            <a href="/admin/messages/{{ $message->id }}">{{ $message->email }}</a>
                        </td>
                        <td>
                            <a href="/admin/messages/{{ $message->id }}">{{ $message->getShortMessage() }}</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            {{ $messages->links() }}
        @else
            <h2>{{ __('admin.no-messages-found') }}</h2>
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

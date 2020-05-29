@php
    /** @var App\ContactMessage $message */
@endphp

@extends('admin.layout.master')

@section('documentTitle', __('admin.message'))

@section('content')
    <div class="Grid">
        <h1 class="Grid-Title">{{ __('admin.message') }}</h1>
        <h2><a href="/admin/messages">{{ __('admin.back-to-messages') }}</a></h2>

        <table>
            <tbody>
            <tr>
                <td>{{ __('admin.email') }}</td>
                <td><a href="mailto:{{ $message->email }}">{{ $message->email }}</a></td>
            </tr>
            <tr>
                <td>{{ __('admin.message') }}</td>
                <td>{{ $message->message }}</td>
            </tr>
            <tr>
                <td>{{ __('admin.sent_at') }}</td>
                <td>{{ $message->created_at }}</td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

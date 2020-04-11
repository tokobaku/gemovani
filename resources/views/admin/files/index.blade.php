@extends('admin.layout.master')

@section('documentTitle', __('admin.files'))

@section('content')
    <iframe class="Files" src="{{ route('elfinder.index') }}"></iframe>
@endsection

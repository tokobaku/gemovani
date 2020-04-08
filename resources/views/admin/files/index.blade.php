@extends('admin.layout.master')

@section('content')
    <iframe class="Files" src="{{ route('elfinder.index') }}"></iframe>
@endsection

{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

@extends('admin.layout.master')

@section('content')
    <h1>{{ __('admin.page-not-found') }}</h1>
    <a href="{{ url()->previous() }}">{{ __('admin.go-back-where-you-came-from') }}</a>
@endsection

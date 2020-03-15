{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

@extends('admin.layout.master')

@section('content')
    <h1>{{ __('404, Page not found!') }}</h1>
    <a href="{{ url()->previous() }}">{{ __('Go back, where you came from') }}</a>
@endsection

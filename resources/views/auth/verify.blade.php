@extends('auth.layout.master')

@section('content')
<div class="Form">
    <div class="Form-Header">{{ __('Verify Your Email Address') }}</div>

    <div class="Form-Content">
        @if (session('resent'))
            <div class="Form-SuccessMessage" role="alert">
                {{ __('A fresh verification link has been sent to your email address.') }}
            </div>
        @endif

        {{ __('Before proceeding, please check your email for a verification link.') }}
        {{ __('If you did not receive the email') }},
        <form method="POST" action="{{ route('verification.resend') }}">
            @csrf
            <button type="submit">{{ __('click here to request another') }}</button>.
        </form>
    </div>
</div>
@endsection

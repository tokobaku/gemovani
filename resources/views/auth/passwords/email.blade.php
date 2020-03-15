@extends('auth.layout.master')

@section('body')
<div class="Form">
    <h1 class="Form-Header">{{ __('Reset Password') }}</h1>

    <div class="Form-Content">
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <div class="Form-FormGroup">
                <label for="email" class="Form-Label">{{ __('E-Mail Address') }}</label>

                <div class="Form-InputWrapper">
                    <input id="email" type="email" class="Form-Input" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                    @error('email')
                        <span class="Form-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>

            <div class="Form-FormGroup">
                <button type="submit">
                    {{ __('Send Password Reset Link') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection

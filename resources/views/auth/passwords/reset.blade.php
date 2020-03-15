@extends('auth.layout.master')

@section('body')
<div class="Form">
    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        <input type="hidden" name="token" value="{{ $token }}">

        <div class="Form-FormGroup">
            <label for="email" class="Form-Label">{{ __('E-Mail Address') }}</label>

            <div class="Form-InputWrapper">
                <input id="email" type="email" class="Form-Input" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                    <span class="Form-ErrorMessage" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>

        <div class="Form-FormGroup">
            <label for="password" class="Form-Label">{{ __('Password') }}</label>

            <div class="col-md-6">
                <input id="password" type="password" class="Form-Input" name="password" required autocomplete="new-password">

                @error('password')
                    <span class="Form-ErrorMessage" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>

        <div class="Form-FormGroup">
            <label for="password-confirm" class="Form-Label">{{ __('Confirm Password') }}</label>

            <div class="Form-InputWrapper">
                <input id="password-confirm" type="password" class="Form-Input" name="password_confirmation" required autocomplete="new-password">
            </div>
        </div>

        <div class="Form-FormGroup">
            <div class="Form-InputWrapper">
                <button type="submit">
                    {{ __('Reset Password') }}
                </button>
            </div>
        </div>
    </form>
</div>
@endsection

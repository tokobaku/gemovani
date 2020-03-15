@extends('auth.layout.master')

@section('body')
<div class="Form">
    <div class="Form-Header">{{ __('Confirm Password') }}</div>

    <div class="Form-Content">
        {{ __('Please confirm your password before continuing.') }}

        <form method="POST" action="{{ route('password.confirm') }}">
            @csrf

            <div class="Form-FormGroup">
                <label for="password" class="Form-Label">{{ __('Password') }}</label>

                <div class="Form-InputWrapper">
                    <input id="password" type="password" class="From-Input" name="password" required autocomplete="current-password">

                    @error('password')
                        <span class="Form-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>

            <div class="Form-FormGroup">
                <div class="Form-InputWrapper">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Confirm Password') }}
                    </button>

                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                    @endif
                </div>
            </div>
        </form>
    </div>
</div>
@endsection

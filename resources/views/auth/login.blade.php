@extends('auth.layout.master')

@section('documentTitle', 'სამართავ პანელში შესვლა')

@section('body')
    <div class="Form">
        <h1 class="Form-Header">{{ __('Login') }}</h1>

        <div class="Form-Content">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="Form-FormGroup">
                    <label for="email" class="Form-Label">{{ __('E-Mail Address') }}</label>

                    <div class="Form-InputWrapper">
                        <input id="email" type="email" class="Form-Input @error('email') Form-Input_isInvalid @enderror"
                               name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                        @error('email')
                        <span class="Form-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="Form-FormGroup">
                    <label for="password" class="Form-Label">{{ __('Password') }}</label>

                    <div class="Form-InputWrapper">
                        <input id="password" type="password"
                               class="Form-Input @error('password') Form-Input_isInvalid @enderror" name="password"
                               required autocomplete="current-password">

                        @error('password')
                        <span class="Form-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="Form-FormGroup_isFlex">
                    <input class="Form-Input" type="checkbox" name="remember"
                           id="remember" {{ old('remember') ? 'checked' : '' }}>

                    <label class="Form-Label" for="remember">
                        {{ __('Remember Me') }}
                    </label>
                </div>

                <div class="Form-FormGroup Form-FormGroup_isFlex">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Login') }}
                    </button>

                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                    @endif
                </div>
            </form>
        </div>
    </div>
@endsection

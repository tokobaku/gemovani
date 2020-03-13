@extends('auth.layout.master')

@section('documentTitle', 'სამართავ პანელში შესვლა')

@section('body')
    <div class="Login">
        <div class="Login-Header">{{ __('Login') }}</div>

        <div class="Login-Content">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="Login-FormGroup">
                    <label for="email" class="Login-Label">{{ __('E-Mail Address') }}</label>

                    <div class="Login-InputWrapper">
                        <input id="email" type="email" class="Login-Input @error('email') Login-Input_isInvalid @enderror"
                               name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                        @error('email')
                        <span class="Login-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="Login-FormGroup">
                    <label for="password" class="Login-Label">{{ __('Password') }}</label>

                    <div class="Login-InputWrapper">
                        <input id="password" type="password"
                               class="Login-Input @error('password') Login-Input_isInvalid @enderror" name="password"
                               required autocomplete="current-password">

                        @error('password')
                        <span class="Login-ErrorMessage" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="Login-FormGroup">
                    <input class="Login-Input" type="checkbox" name="remember"
                           id="remember" {{ old('remember') ? 'checked' : '' }}>

                    <label class="Login-Label" for="remember">
                        {{ __('Remember Me') }}
                    </label>
                </div>

                <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Login') }}
                        </button>

                        @if (Route::has('password.request'))
                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

<header class="Header">
    <div class="Header-Content">
        <ul class="Header-Auth">
            @guest
                <li>
                    <a href="{{ route('login') }}">{{ __('admin.login') }}</a>
                </li>
            @else
                <li class="Dropdown">
                    <span class="Dropdown-Label">
                        {{ Auth::user()->name }}
                    </span>

                    <span>
                        <a href="{{ route('logout') }}"
                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            {{ __('admin.logout') }}
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </span>
                </li>
            @endguest
        </ul>
    </div>
</header>

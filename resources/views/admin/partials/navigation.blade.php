{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

<nav class="Nav">
    <ul class="Nav-Menu">
        <li class="Nav-MenuItem">
            <a href="{{ url('/admin/files') }}">{{ __('admin.files') }}</a>
        </li>
        <li class="Nav-MenuItem">
            <a href="{{ url('/admin/galleries') }}">{{ __('admin.galleries') }}</a>
        </li>
        <li class="Nav-MenuItem">
            <a href="{{ url('/admin/faq') }}">{{ __('admin.faq') }}</a>
        </li>
        <li class="Nav-MenuItem">
            <a href="{{ url('/admin/tours') }}">{{ __('admin.tours') }}</a>
        </li>
        <li class="Nav-MenuItem">
            <a href="{{ url('/admin/locations') }}">{{ __('admin.locations') }}</a>
        </li>
    </ul>
</nav>

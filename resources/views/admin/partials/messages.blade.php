{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

@php
/** @var array $messages */
$messages = session('messages');
@endphp

@if($messages && count($messages))
<div class="Messages">
    <ul>
    @foreach($messages as $message)
        <li class="Messages-Item Messages-Item_{{ $message['type'] }}">{{ $message['message'] }}</li>
    @endforeach
    </ul>
</div>
@endisset

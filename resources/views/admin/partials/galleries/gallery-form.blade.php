{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

@php
    $galleryItemsJson = '[]';

    if (isset($gallery)) {
        $galleryItemsJson = $gallery->items;
    }

    $galleryItemsJson = old('items') ?? $galleryItemsJson;
@endphp

@section('scripts')
    <script>
        const addVideo = videoId => {
            if (!videoId) {
                alert('{{ __('admin.invalid-video-link') }}');
                return;
            }

            const galleryItems = document.querySelector('#gallery-items');
            const newItem = document.createElement('li');
            const newItemContentWrapper = document.createElement('div');
            const newItemVideo = document.createElement('iframe');
            const newItemButton = document.createElement('button');
            const newItemHiddenInput = document.createElement('input');
            const newItemDrag = document.createElement('div');

            newItemDrag.classList.add('GalleryItems-ItemDrag');

            newItemHiddenInput.type = 'hidden';
            newItemHiddenInput.value = JSON.stringify({ type: 'video', value: videoId });

            newItemButton.onclick = function (event) {
                event.preventDefault();
                event.target.closest('li').remove();
            };
            newItemButton.innerText = 'X';

            newItemVideo.src = `https://youtube.com/embed/${videoId}`;
            newItemVideo.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            newItemVideo.allowFullscreen = true;
            newItemVideo.width = 300;
            newItemVideo.height = 300;

            newItem.classList.add('GalleryItems-Item');

            newItemContentWrapper.append(newItemButton, newItemVideo, newItemHiddenInput, newItemDrag);
            newItem.append(newItemContentWrapper);

            galleryItems.appendChild(newItem);
            Sortable.create(document.querySelector('#gallery-items'));
        };

        const addImage = file => {
            const galleryItems = document.querySelector('#gallery-items');
            const newItem = document.createElement('li');
            const newItemContentWrapper = document.createElement('div');
            const newItemImage = document.createElement('img');
            const newItemButton = document.createElement('button');
            const newItemHiddenInput = document.createElement('input');
            const newItemDrag = document.createElement('div');

            newItemDrag.classList.add('GalleryItems-ItemDrag');

            newItemHiddenInput.type = 'hidden';
            newItemHiddenInput.value = JSON.stringify({ type: 'image', value: file });

            newItemButton.onclick = function (event) {
                event.preventDefault();
                event.target.closest('li').remove();
            };
            newItemButton.innerText = 'X';

            newItemImage.src = `/image/${file}?w=300`;

            newItem.classList.add('GalleryItems-Item');

            newItemContentWrapper.append(newItemButton, newItemImage, newItemHiddenInput, newItemDrag);
            newItem.append(newItemContentWrapper);

            galleryItems.appendChild(newItem);
            Sortable.create(document.querySelector('#gallery-items'));
        };

        window.addEventListener('load', function () {
            document.querySelector('#add-image').addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();

                const selectImagePopup = window.createGalleryPopup({
                    inputId: 'selected-image',
                    onFileSelected: file => {
                        addImage(file);
                    }
                });

                selectImagePopup.openPopup();
            });

            document.querySelector('#add-video').addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const selectedVideoInput = document.querySelector('#selected-video');
                const videoId = getVideoId(selectedVideoInput.value);

                if (!videoId) {
                    alert('{{ __('admin.invalid-video-link') }}');
                    return;
                }

                addVideo(videoId);
                selectedVideoInput.value = '';
            });

            const initializeGalleryItems = () => {
                const galleryItems = JSON.parse('{!! $galleryItemsJson !!}');

                if (!galleryItems) {
                    return;
                }

                galleryItems.forEach(({ type, value }) => {
                    if (type === 'video') {
                        addVideo(value);
                    }

                    if (type === 'image') {
                        addImage(value);
                    }
                });
            };

            initializeGalleryItems();

            const getGalleryItemsJson = () => {
                const galleryItemsJson = [];

                document.querySelector('#gallery-items').childNodes.forEach(node => {
                    galleryItemsJson.push(JSON.parse(node.querySelector('input').value));
                });

                return galleryItemsJson;
            };

            document.querySelector('#submit-button').addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const items = getGalleryItemsJson();
                document.querySelector('#gallery-items-input').value = JSON.stringify(items);

                document.querySelector('#gallery-form').submit();
            });
        });
    </script>
@endsection

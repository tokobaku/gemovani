{{--
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>.
 */
--}}

@section('scripts')
    <script>
        window.addEventListener('load', function () {
            mapboxgl.accessToken = '{{ env('MAPBOXGL_ACCESS_TOKEN') }}';
            window.createMap(
                {
                    container: 'map',
                    @if (isset($location))
                    longitude: '{{ $location->longitude }}',
                    latitude: '{{ $location->latitude }}'
                    @endif
                },
                'longitude',
                'latitude'
            );

            const displayImage = file => {
                const image = document.querySelector('#image-wrapper img') || document.createElement('img');
                image.src = `/image/${file}/?w=300`;

                document.querySelector('#image-wrapper').appendChild(image);
            };

            document.querySelector('#choose-image').addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();

                const selectImagePopup = window.createGalleryPopup({
                    inputId: 'selected-image',
                    onFileSelected: file => {
                        displayImage(file);
                    }
                });

                selectImagePopup.openPopup();
            });

            // Display image if it's present
            const selectedImage = document.querySelector('#selected-image');
            if (selectedImage.value) {
                displayImage(selectedImage.value);
            }
        });
    </script>
@endsection

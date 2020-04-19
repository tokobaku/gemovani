/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

const DEFAULT_LONGITUDE = 44.78236211106977;
const DEFAULT_LATITUDE = 41.71322387319677;
const DEFAULT_ZOOM = 12;
const DEFAULT_STYLE = 'mapbox://styles/mapbox/streets-v11';

class Map {
    /**
     *
     * @param {string} accessToken
     * @param {string} container
     * @param {number|string} longitude
     * @param {number|string} latitude
     * @param {number} zoom
     * @param {string} style
     * @param {function|undefined} onChange
     */
    constructor({
        container,
        longitude = DEFAULT_LONGITUDE,
        latitude = DEFAULT_LATITUDE,
        zoom = DEFAULT_ZOOM,
        style = DEFAULT_STYLE,
        onChange
    }) {
        this.createMap(container, style, longitude, latitude, zoom);
        this.createPin(longitude, latitude);
        this.onChange = onChange;
    }

    /**
     *
     * @param {string} container
     * @param {string} style
     * @param {string|number} longitude
     * @param {string|number} latitude
     * @param {number} zoom
     */
    createMap(container, style, longitude, latitude, zoom) {
        this.map = new mapboxgl.Map({
            container,
            style,
            center: [longitude, latitude],
            zoom
        });

        this.map.on('click', this.onMapClick.bind(this));
    }

    /**
     *
     * @param {number|string} longitude
     * @param {number|string} latitude
     */
    createPin(longitude, latitude) {
        const pinElement = document.createElement('div');
        pinElement.classList.add('Map-Marker', 'mapboxgl-marker');

        this.marker = new mapboxgl.Marker(pinElement)
            .setLngLat([longitude, latitude])
            .addTo(this.map);
    }

    onMapClick(event) {
        this.marker.setLngLat([event.lngLat.lng, event.lngLat.lat])
            .addTo(this.map);

        if (this.onChange) {
            this.onChange(event);
        }
    }
}

window.addEventListener('load', () => {
    /**
     * @param options
     * @param longitudeFieldId
     * @param latitudeFieldId
     * @return {Map}
     */
    window.createMap = (options, longitudeFieldId = null, latitudeFieldId = null) => {
        if (longitudeFieldId && latitudeFieldId) {
            const onChange = (e) => {
                document.getElementById(longitudeFieldId).value = e.lngLat.lng;
                document.getElementById(latitudeFieldId).value = e.lngLat.lat;
            };
            const { longitude = DEFAULT_LONGITUDE, latitude = DEFAULT_LATITUDE } = options;

            document.getElementById(longitudeFieldId).value = longitude;
            document.getElementById(latitudeFieldId).value = latitude;

            return new Map({ ...options, onChange });
        }

        return new Map(options);
    };
});

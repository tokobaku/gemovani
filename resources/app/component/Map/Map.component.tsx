/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import * as mapboxgl from 'mapbox-gl';
import { BEMEntity } from 'rebem-classname';

import 'Component/Map/Map.style';

export interface MapProps {
    longitude: string;
    latitude: string;
    zoom: number;
    style: string;
    mix: BEMEntity;
    accessToken: string;
}

export default class Map extends React.PureComponent<MapProps> {
    map: mapboxgl.Map | undefined;

    marker: mapboxgl.Marker | undefined;

    static defaultProps = {
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
        accessToken: 'pk.eyJ1IjoidG9rb2Jha3UiLCJhIjoiY2p0YTNyNHA3MDFlczRhbzV5bTc4YTNlYSJ9.u28dmysI_eRPbHFqgo-x5w',
        mix: {}
    };

    componentDidMount(): void {
        this.initializeMap();
        this.createPin();
    }

    initializeMap(): void {
        const {
            longitude,
            latitude,
            style,
            zoom,
            accessToken
        } = this.props;

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        mapboxgl.accessToken = accessToken;

        this.map = new mapboxgl.Map({
            container: '#map',
            style,
            center: [parseFloat(longitude), parseFloat(latitude)],
            zoom
        });
    }

    createPin(): void {
        const { longitude, latitude } = this.props;

        const pinElement = document.createElement('div');
        pinElement.classList.add('Map-Marker');

        if (this.map instanceof mapboxgl.Map) {
            this.marker = new mapboxgl.Marker(pinElement)
                .setLngLat([parseFloat(longitude), parseFloat(latitude)])
                .addTo(this.map);
        }
    }

    render(): React.ReactNode {
        const { mix } = this.props;

        return (
            <div block="Map" mix={mix}>
                <div block="Map" elem="Map" id="#map" />
            </div>
        );
    }
}

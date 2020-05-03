import * as React from 'react';
import Slider from 'Component/Slider';
import ToursList from 'Component/ToursList/ToursList.container';

export default class Homepage extends React.Component<{}, {}> {
    render(): React.ComponentElement<{}, Homepage> {
        return (
            <div>
                <Slider />
                <ToursList />
            </div>
        );
    }
}

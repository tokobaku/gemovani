/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { StateProps } from 'Component/ToursList/ToursList.container';
import { Tour as TourInterface } from 'Store/Tours/Tours.action';
import Tour from 'Component/Tour';

export default class ToursList extends React.PureComponent<StateProps> {
    renderTour(tour: TourInterface): React.ReactNode {
        return (
            <Tour tour={tour} key={tour.url_key} />
        );
    }

    render(): React.ReactNode {
        const { tours } = this.props;

        return (
            <div block="ToursList">
                {tours.map((tour) => this.renderTour(tour))}
            </div>
        );
    }
}

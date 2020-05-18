/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { StateProps } from 'Component/ToursList/ToursList.container';
import { Tour as TourInterface } from 'Store/Tours/Tours.action';
import Tour from 'Component/Tour';

export default class ToursList extends React.PureComponent<StateProps> {
    renderTour(tour: TourInterface, index: number): React.ReactNode {
        const { tours } = this.props;

        const nextTourUrlKey = index + 1 >= tours.length ? null : tours[index + 1].url_key;

        return (
            <Tour tour={tour} key={index} nextTourUrlKey={nextTourUrlKey} />
        );
    }

    render(): React.ReactNode {
        const { tours } = this.props;

        return (
            <div block="ToursList">
                {tours.map((tour, index) => this.renderTour(tour, index))}
            </div>
        );
    }
}

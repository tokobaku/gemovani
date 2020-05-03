/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import TourPage from 'Route/TourPage/TourPage.component';
import { ReduxState } from 'Store';
import { Tour, ToursAction, updateTours } from 'Store/Tours/Tours.action';
import ToursQuery from 'Query/ToursQuery';

export interface TourPageContainerParams {
    urlKey: string;
}

export interface DispatchProps {
    updateTours: (tours: Tour[]) => void;
}

export interface StateProps {
    tours: Tour[];
}

export const mapDispatchToProps = (dispatch: React.Dispatch<ToursAction>): DispatchProps => ({
    updateTours: (tours: Tour[]): void => dispatch(updateTours(tours))
});

export const mapStateToProps = (state: ReduxState): StateProps => ({
    tours: state.ToursReducer.tours
});

export interface TourPageContainerProps extends
    StateProps,
    DispatchProps,
    RouteComponentProps<TourPageContainerParams> {}

export class TourPageContainer extends React.PureComponent<TourPageContainerProps> {
    getTour(): Tour | null {
        const { tours, match: { params: { urlKey } } } = this.props;
        const matchedTour = tours.find((tour) => tour.url_key === urlKey);

        if (!matchedTour) {
            this.requestTours();
        }

        return matchedTour || null;
    }

    requestTours(): void {
        const { updateTours } = this.props;
        ToursQuery.getTours(updateTours);
    }

    render(): React.ReactNode {
        const { tours, match: { params: { urlKey } } } = this.props;
        const tour = this.getTour();

        if (!tour && tours.length) {
            location.replace('/');
            return null;
        }

        return <TourPage urlKey={urlKey} tour={tour} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TourPageContainer);

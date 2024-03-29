/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import ToursList from 'Component/ToursList/ToursList.component';
import { Tour, ToursAction, updateTours } from 'Store/Tours/Tours.action';
import ToursQuery from 'Query/ToursQuery';
import { ReduxState } from 'Store';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    tours: state.ToursReducer.tours
});

export const mapDispatchToProps = (dispatch: React.Dispatch<ToursAction>): DispatchProps => ({
    updateTours: (tours: Tour[]): void => dispatch(updateTours(tours))
});

export interface DispatchProps {
    updateTours: (tours: Tour[]) => void;
}

export interface StateProps {
    tours: Tour[];
}

export interface ToursListProps extends DispatchProps, StateProps {}

export class ToursListContainer extends React.PureComponent<ToursListProps> {
    componentDidMount(): void {
        this.requestTours();
    }

    requestTours(): void {
        const { updateTours } = this.props;
        ToursQuery.getTours(updateTours);
    }

    render(): React.ReactNode {
        const { tours } = this.props;

        return <ToursList tours={tours} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToursListContainer);

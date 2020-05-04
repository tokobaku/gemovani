/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import { Gallery, GalleriesAction, updateGalleries } from 'Store/Galleries/Galleries.action';
import GalleriesQuery from 'Query/GalleriesQuery';
import GalleriesPage from 'Route/GalleriesPage/GalleriesPage.component';

export interface StateProps {
    galleries: Gallery[];
}

export interface DispatchProps {
    updateGalleries: (galleries: Gallery[]) => void;
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
    galleries: state.GalleriesReducer.galleries
});

export const mapDispatchToProps = (dispatch: React.Dispatch<GalleriesAction>): DispatchProps => ({
    updateGalleries: (galleries: Gallery[]): void => dispatch(updateGalleries(galleries))
});

export interface GalleriesPageContainerProps extends DispatchProps, StateProps {}

export class GalleriesPageContainer extends React.PureComponent<GalleriesPageContainerProps> {
    componentDidMount(): void {
        const { galleries } = this.props;

        if (!galleries.length) {
            this.requestGalleries();
        }
    }

    requestGalleries(): void {
        const { updateGalleries } = this.props;
        GalleriesQuery.getGalleries(updateGalleries);
    }

    render(): React.ReactNode {
        const { galleries } = this.props;

        return <GalleriesPage galleries={galleries} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleriesPageContainer);

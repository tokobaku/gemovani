/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import { GalleriesAction, Gallery, updateGalleries } from 'Store/Galleries/Galleries.action';
import GalleriesQuery from 'Query/GalleriesQuery';
import GalleryPage from 'Route/GalleryPage/GalleryPage.component';

export interface DispatchProps {
    updateGalleries: (galleries: Gallery[]) => void;
}

export interface StateProps {
    galleries: Gallery[];
}

export const mapStateToProps = (state: ReduxState): StateProps => ({
    galleries: state.GalleriesReducer.galleries
});

export const mapDispatchToProps = (dispatch: React.Dispatch<GalleriesAction>): DispatchProps => ({
    updateGalleries: (galleries: Gallery[]): void => dispatch(updateGalleries(galleries))
});

export interface GalleryPageParams {
    urlKey: string;
}

export interface GalleryPageProps extends StateProps, DispatchProps, RouteComponentProps<GalleryPageParams> {}

export class GalleryPageContainer extends React.PureComponent<GalleryPageProps> {
    componentDidMount(): void {
        const { galleries } = this.props;

        if (!galleries.length) {
            this.requestGalleries();
        }
    }

    getGallery(): Gallery | undefined {
        const { galleries, match: { params: { urlKey } } } = this.props;

        return galleries.find((gallery) => gallery.url_key === urlKey);
    }

    requestGalleries(): void {
        const { updateGalleries } = this.props;
        GalleriesQuery.getGalleries(updateGalleries);
    }

    render(): React.ReactNode {
        return <GalleryPage gallery={this.getGallery()} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPageContainer);

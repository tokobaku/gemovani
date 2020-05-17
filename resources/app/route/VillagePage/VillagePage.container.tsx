/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ReduxState } from 'Store';
import { Village, VillagesAction, updateVillages } from 'Store/Villages/Villages.action';
import VillagesQuery from 'Query/VillagesQuery';
import VillagePage from 'Route/VillagePage/VillagePage.component';

export const mapDispatchToProps = (dispatch: React.Dispatch<VillagesAction>): DispatchProps => ({
    updateVillages: (villages): void => dispatch(updateVillages(villages))
});

export const mapStateToProps = (state: ReduxState): StateProps => ({
    villages: state.VillagesReducer.villages
});

export interface StateProps {
    villages: Village[];
}

export interface DispatchProps {
    updateVillages: (villages: Village[]) => void;
}

export interface VillagePageUrlParams {
    urlKey: string;
}

export interface VillagePageContainerProps extends
    StateProps,
    DispatchProps,
    RouteComponentProps<VillagePageUrlParams> {}

export class VillagePageContainer extends React.PureComponent<VillagePageContainerProps> {
    componentDidMount(): void {
        const { villages } = this.props;

        if (!villages.length) {
            this.requestVillages();
        }
    }


    getVillage(): Village | undefined {
        const { villages, match: { params: { urlKey } } } = this.props;

        // eslint-disable-next-line @typescript-eslint/camelcase
        return villages.find(({ url_key }) => urlKey === url_key);
    }

    requestVillages(): void {
        const { updateVillages } = this.props;
        VillagesQuery.getVillages(updateVillages);
    }

    render(): React.ReactNode {
        const { match: { params: { urlKey } } } = this.props;

        return <VillagePage village={this.getVillage()} urlKey={urlKey} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VillagePageContainer);

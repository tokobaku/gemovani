/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import { Village, VillagesAction, updateVillages } from 'Store/Villages/Villages.action';
import VillagesQuery from 'Query/VillagesQuery';
import VillagesPage from 'Route/VillagesPage/VillagesPage.component';

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

export interface VillagesPageContainerProps extends StateProps, DispatchProps {}

export class VillagesPageContainer extends React.PureComponent<VillagesPageContainerProps> {
    componentDidMount(): void {
        const { villages } = this.props;

        if (!villages.length) {
            this.requestVillages();
        }
    }

    requestVillages(): void {
        const { updateVillages } = this.props;
        VillagesQuery.getVillages(updateVillages);
    }

    render(): React.ReactNode {
        const { villages } = this.props;

        return <VillagesPage villages={villages} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VillagesPageContainer);

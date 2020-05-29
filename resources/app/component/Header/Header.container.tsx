/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import Header from 'Component/Header/Header.component';
import { ReduxState } from 'Store';
import {
    Config,
    Config as StateProps,
    ConfigAction,
    updateConfig
} from 'Store/Config/Config.action';
import ConfigQuery from 'Query/ConfigQuery';
import FetchGraphql from 'Helper/FetchGraphql';
import { openPopup, PopupActionInterface } from 'Store/Popup/Popup.action';

export const mapDispatchToProps = (dispatch: React.Dispatch<ConfigAction | PopupActionInterface>): DispatchProps => ({
    updateConfig: (config: Config): void => dispatch(updateConfig(config)),
    openPopup: (): void => dispatch(openPopup())
});

export const mapStateToProps = (state: ReduxState): StateProps => ({
    config: state.ConfigReducer.config
});

export interface DispatchProps {
    updateConfig(config: Config): void;
    openPopup(): void;
}

export interface HeaderContainerProps extends DispatchProps, StateProps {}

export class HeaderContainer extends React.PureComponent<HeaderContainerProps> {
    componentDidMount(): void {
        this.requestConfig();
    }

    requestConfig(): void {
        const { updateConfig } = this.props;

        FetchGraphql.get(ConfigQuery.getConfig(), (response) => {
            response.json().then((data) => {
                updateConfig(data.data);
            });
        });
    }

    render(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { config: { title, gemovani_logo, gemovani_sound }, openPopup } = this.props;

        return (
            // eslint-disable-next-line @typescript-eslint/camelcase
            <Header title={title} gemovani_logo={gemovani_logo} gemovani_sound={gemovani_sound} openPopup={openPopup} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

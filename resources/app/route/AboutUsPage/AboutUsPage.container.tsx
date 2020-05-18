/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import {
    AboutUs,
    Config,
    ConfigAction,
    updateConfig
} from 'Store/Config/Config.action';
import ConfigQuery from 'Query/ConfigQuery';
import FetchGraphql from 'Helper/FetchGraphql';
import AboutUsPage from 'Route/AboutUsPage/AboutUsPage.component';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    aboutUs: state.ConfigReducer.config.about_us
});

export const mapDispatchToProps = (dispatch: React.Dispatch<ConfigAction>): DispatchProps => ({
    updateConfig: (config): void => dispatch(updateConfig(config))
});

export interface StateProps {
    aboutUs: AboutUs[];
}

export interface DispatchProps {
    updateConfig: (config: Config) => void;
}

export class AboutUsPageContainer extends React.PureComponent<StateProps> {
    componentDidMount(): void {
        const { aboutUs } = this.props;

        if (aboutUs.length) {
            this.requestConfig();
        }
    }

    requestConfig(): void {
        FetchGraphql.get(
            ConfigQuery.getConfig(),
            (data): void => {
                data.json().then((jsonData) => updateConfig(jsonData));
            }
        );
    }

    render(): React.ReactNode {
        const { aboutUs } = this.props;

        return <AboutUsPage aboutUs={aboutUs} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPageContainer);

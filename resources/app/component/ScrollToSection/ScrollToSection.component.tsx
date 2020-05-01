/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';

const mapStateToProps = (state: ReduxState): object => ({
    state
});

export class ScrollToSection extends React.PureComponent<RouteComponentProps> {
    render(): React.ReactNode {
        window.requestAnimationFrame(() => {
            const { location: { hash } } = this.props;
            if (hash) {
                const scrollTo = document.querySelector(hash);
                if (scrollTo) {
                    window.scrollTo({
                        left: scrollTo.getBoundingClientRect().left,
                        top: scrollTo.getBoundingClientRect().top,
                        behavior: 'smooth'
                    });
                }
            }
        });

        return '';
    }
}

export default connect(mapStateToProps)(withRouter(ScrollToSection));

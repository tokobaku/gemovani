/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import { Faq, FaqsAction, updateFaqs } from 'Store/Faqs/Faqs.action';
import FaqsQuery from 'Query/FaqsQuery';
import FaqPage from 'Route/FaqPage/FaqPage.component';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    faqs: state.FaqsReducer.faqs
});

export const mapDispatchToProps = (dispatch: React.Dispatch<FaqsAction>): DispatchProps => ({
    updateFaqs: (faqs: Faq[]): void => dispatch(updateFaqs(faqs))
});

export interface StateProps {
    faqs: Faq[];
}

export interface DispatchProps {
    updateFaqs: (faqs: Faq[]) => void;
}

export interface FaqPageContainerProps extends DispatchProps, StateProps {}

export class FaqPageContainer extends React.PureComponent<FaqPageContainerProps> {
    componentDidMount(): void {
        const { faqs } = this.props;

        if (!faqs.length) {
            this.requestFaqs();
        }
    }

    requestFaqs(): void {
        const { updateFaqs } = this.props;
        FaqsQuery.getFaqs(updateFaqs);
    }

    render(): React.ReactNode {
        const { faqs } = this.props;

        return <FaqPage faqs={faqs} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqPageContainer);

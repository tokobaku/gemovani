/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import ContactPopup from 'Component/ContactPopup/ContactPopup.component';
import { PopupActionInterface, closePopup } from 'Store/Popup/Popup.action';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    popupIsOpen: state.PopupReducer.popupIsOpen
});

export const mapDispatchToProps = (dispatch: React.Dispatch<PopupActionInterface>): DispatchProps => ({
    closePopup: (): void => dispatch(closePopup())
});

export interface StateProps {
    popupIsOpen: boolean;
}

export interface DispatchProps {
    closePopup: () => void;
}

export interface ContactPopupContainerProps extends StateProps, DispatchProps {}

export class ContactPopupContainer extends React.PureComponent<ContactPopupContainerProps> {
    render(): React.ReactNode {
        const { popupIsOpen, closePopup } = this.props;

        return <ContactPopup popupIsOpen={popupIsOpen} closePopup={closePopup} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPopupContainer);

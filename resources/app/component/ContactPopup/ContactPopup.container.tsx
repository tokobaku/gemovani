/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import ContactPopup from 'Component/ContactPopup/ContactPopup.component';
import { PopupActionInterface, closePopup } from 'Store/Popup/Popup.action';
import { showNotification, Notification } from 'Store/NotificationList/NotificationList.action';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    popupIsOpen: state.PopupReducer.popupIsOpen
});

export const mapDispatchToProps = (dispatch: React.Dispatch<PopupActionInterface>): DispatchProps => ({
    closePopup: (): void => dispatch(closePopup()),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    showNotification: (notification: Notification): void => dispatch(showNotification(notification))
});

export interface StateProps {
    popupIsOpen: boolean;
}

export interface DispatchProps {
    closePopup: () => void;
    showNotification: (notification: Notification) => void;
}

export interface ContactPopupContainerProps extends StateProps, DispatchProps {}

export class ContactPopupContainer extends React.PureComponent<ContactPopupContainerProps> {
    constructor(props: ContactPopupContainerProps) {
        super(props);

        this.showNotification = this.showNotification.bind(this);
    }

    showNotification(notification: Notification): void {
        const { showNotification } = this.props;

        showNotification(notification);
    }

    render(): React.ReactNode {
        const { popupIsOpen, closePopup } = this.props;

        return (
            <ContactPopup
                popupIsOpen={popupIsOpen}
                closePopup={closePopup}
                showNotification={this.showNotification}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPopupContainer);

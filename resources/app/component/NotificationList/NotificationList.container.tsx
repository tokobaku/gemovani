/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import {
    NotificationListActionInterface,
    popNotification,
    Notification
} from 'Store/NotificationList/NotificationList.action';
import NotificationList from 'Component/NotificationList/NotificationList.component';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    notifications: state.NotificationListReducer.notificationList
});

export const mapDispatchToProps = (
    dispatch: React.Dispatch<NotificationListActionInterface<undefined>>
): DispatchProps => ({
    popNotification: (): void => dispatch(popNotification())
});

export interface StateProps {
    notifications: Notification[];
}

export interface DispatchProps {
    popNotification: () => void;
}

export interface NotificationProps extends StateProps, DispatchProps {}

class NotificationListContainer extends React.PureComponent<NotificationProps> {
    render(): React.ReactNode {
        const { notifications, popNotification } = this.props;

        return <NotificationList notifications={notifications} popNotification={popNotification} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer);

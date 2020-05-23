/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Notification } from 'Store/NotificationList/NotificationList.action';

import 'Component/NotificationList/Notification.style';

export interface NotificationProps {
    notifications: Notification[];
    popNotification: () => void;
}

export const NOTIFICATION_TIME = 5000;

export default class NotificationList extends React.PureComponent<NotificationProps> {
    componentDidUpdate(): void {
        const { popNotification } = this.props;

        setTimeout(popNotification, NOTIFICATION_TIME);
    }

    renderNotification(notification: Notification, index: number): React.ReactNode {
        const { type, message } = notification;

        return (
            <div block="NotificationList" elem="Notification" mods={{ type }} key={index}>
                {message}
            </div>
        );
    }

    renderNotifications(): React.ReactNode {
        const { notifications } = this.props;

        if (!notifications.length) {
            return null;
        }

        return (
            <ul>
                {notifications.map(
                    (notification, index) => this.renderNotification(notification, index)
                )}
            </ul>
        );
    }

    render(): React.ReactNode {
        return (
            <div block="NotificationList">
                {this.renderNotifications()}
            </div>
        );
    }
}

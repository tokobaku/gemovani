/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum NotificationListActionEnum {
    SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
    POP_NOTIFICATION = 'POP_NOTIFICATION'
}

export interface NotificationListActionInterface<T> {
    type: NotificationListActionEnum;
    notification: T;
}

export interface Notification {
    message: string;
    type: 'success' | 'error';
}

export const showNotification = (notification: Notification): NotificationListActionInterface<Notification> => ({
    type: NotificationListActionEnum.SHOW_NOTIFICATION,
    notification
});

export const popNotification = (): NotificationListActionInterface<undefined> => ({
    type: NotificationListActionEnum.POP_NOTIFICATION,
    notification: undefined
});

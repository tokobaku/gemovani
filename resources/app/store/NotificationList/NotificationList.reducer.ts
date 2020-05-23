/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */
import {
    NotificationListActionEnum,
    NotificationListActionInterface,
    Notification
} from 'Store/NotificationList/NotificationList.action';

export interface NotificationListReducerInterface {
    notificationList: Notification[];
}

export const initialState: NotificationListReducerInterface = {
    notificationList: []
};

const NotificationListReducer = (
    state = initialState,
    action: NotificationListActionInterface<undefined | Notification>
): NotificationListReducerInterface => {
    const { notificationList } = state;

    switch (action.type) {
    case NotificationListActionEnum.SHOW_NOTIFICATION:
        return {
            ...state,
            notificationList: [...notificationList, action.notification as Notification]
        };
    case NotificationListActionEnum.POP_NOTIFICATION:
        return {
            ...state,
            notificationList: notificationList.splice(0, notificationList.length - 1)
        };
    default:
        return state;
    }
};

export default NotificationListReducer;

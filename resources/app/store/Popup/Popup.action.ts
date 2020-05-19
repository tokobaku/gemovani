/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum PopupActionEnum {
    OPEN_POPUP = 'OPEN_POPUP',
    CLOSE_POPUP = 'CLOSE_POPUP'
}

export interface PopupActionInterface {
    type: PopupActionEnum;
}

export const openPopup = (): PopupActionInterface => ({
    type: PopupActionEnum.OPEN_POPUP
});

export const closePopup = (): PopupActionInterface => ({
    type: PopupActionEnum.CLOSE_POPUP
});

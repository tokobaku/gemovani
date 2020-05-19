/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { PopupActionEnum, PopupActionInterface } from 'Store/Popup/Popup.action';

export interface PopupReducerInterface {
    popupIsOpen: boolean;
}

const initialState: PopupReducerInterface = {
    popupIsOpen: false
};

const PopupReducer = (state = initialState, action: PopupActionInterface): PopupReducerInterface => {
    if (action.type === PopupActionEnum.OPEN_POPUP) {
        return {
            ...state,
            popupIsOpen: true
        };
    }

    return {
        ...state,
        popupIsOpen: false
    };
};

export default PopupReducer;

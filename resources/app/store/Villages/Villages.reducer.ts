/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Village, VillagesAction, VillagesActionEnum } from 'Store/Villages/Villages.action';

export interface VillagesReducerInterface {
    villages: Village[];
}

const initialState: VillagesReducerInterface = {
    villages: []
};

const VillagesReducer = (state = initialState, action: VillagesAction): VillagesReducerInterface => {
    if (action.type === VillagesActionEnum.UPDATE_VILLAGES) {
        return {
            ...state,
            villages: action.data
        };
    }

    return state;
};

export default VillagesReducer;

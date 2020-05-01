/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Tour, ToursAction, ToursActionEnum } from 'Store/Tours/Tours.action';

export interface ToursReducerInterface {
    tours: Tour[];
}

const initialState: ToursReducerInterface = {
    tours: []
};

const ToursReducer = (state = initialState, action: ToursAction): ToursReducerInterface => {
    if (action.type === ToursActionEnum.UPDATE_TOURS) {
        return {
            ...state,
            tours: action.data
        };
    }

    return state;
};

export default ToursReducer;

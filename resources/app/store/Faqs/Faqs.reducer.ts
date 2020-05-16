/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Faq, FaqsAction, FaqsActionEnum } from 'Store/Faqs/Faqs.action';

export interface FaqsReducerInterface {
    faqs: Faq[];
}

const initialState: FaqsReducerInterface = {
    faqs: []
};

const FaqsReducer = (state = initialState, action: FaqsAction): FaqsReducerInterface => {
    if (action.type === FaqsActionEnum.UPDATE_FAQS) {
        return {
            ...state,
            faqs: action.data
        };
    }

    return state;
};

export default FaqsReducer;

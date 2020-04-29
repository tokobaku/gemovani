/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Slide, SlidesAction, SlidesActionEnum } from 'Store/Slides/Slides.action';

export interface SlidesReducerInterface {
    slides: Slide[];
}

const initialState: SlidesReducerInterface = {
    slides: []
};

const SlidesReducer = (state = initialState, action: SlidesAction): SlidesReducerInterface => {
    if (action.type === SlidesActionEnum.UPDATE_SLIDES) {
        return {
            ...state,
            slides: action.data
        };
    }

    return state;
};

export default SlidesReducer;

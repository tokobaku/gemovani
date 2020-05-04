/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */
import { GalleriesActionEnum, Gallery, GalleriesAction } from 'Store/Galleries/Galleries.action';

export interface GalleriesReducerInterface {
    galleries: Gallery[];
}

const initialState = {
    galleries: []
};

const GalleriesReducer = (state = initialState, action: GalleriesAction): GalleriesReducerInterface => {
    if (action.type === GalleriesActionEnum.UPDATE_GALLERIES) {
        return {
            ...state,
            galleries: action.data
        };
    }

    return state;
};

export default GalleriesReducer;

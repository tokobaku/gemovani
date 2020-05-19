/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { createStore, combineReducers } from 'redux';
import { DefaultRootState } from 'react-redux';
import SlidesReducer, { SlidesReducerInterface } from 'Store/Slides/Slides.reducer';
import ToursReducer, { ToursReducerInterface } from 'Store/Tours/Tours.reducer';
import ConfigReducer from 'Store/Config/Config.reducer';
import { Config } from 'Store/Config/Config.action';
import GalleriesReducer, { GalleriesReducerInterface } from 'Store/Galleries/Galleries.reducer';
import FaqsReducer, { FaqsReducerInterface } from 'Store/Faqs/Faqs.reducer';
import VillagesReducer, { VillagesReducerInterface } from 'Store/Villages/Villages.reducer';
import PopupReducer, { PopupReducerInterface } from 'Store/Popup/Popup.reducer';

export interface ReduxState extends DefaultRootState {
    SlidesReducer: SlidesReducerInterface;
    ToursReducer: ToursReducerInterface;
    ConfigReducer: Config;
    GalleriesReducer: GalleriesReducerInterface;
    FaqsReducer: FaqsReducerInterface;
    VillagesReducer: VillagesReducerInterface;
    PopupReducer: PopupReducerInterface;
}

const reducers = {
    SlidesReducer,
    ToursReducer,
    ConfigReducer,
    GalleriesReducer,
    FaqsReducer,
    VillagesReducer,
    PopupReducer
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

const store = createStore(
    combineReducers(reducers),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && __REDUX_DEVTOOLS_EXTENSION__
    ) && __REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export default store;

/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { createStore, combineReducers } from 'redux';
import { DefaultRootState } from 'react-redux';
import SlidesReducer, { SlidesReducerInterface } from './Slides/Slides.reducer';

export interface ReduxState extends DefaultRootState {
    SlidesReducer: SlidesReducerInterface;
}

const reducers = {
    SlidesReducer
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

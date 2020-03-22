import {combineReducers} from 'redux';
import {createReducer, StateType} from "typesafe-actions";

import {setBookmarkDrawerOpen} from "../actions/appActions";

export type AppState = StateType<typeof appReducer>;

const defaultState = {
    isBookmarkDrawerOpen: false,
};

export const appReducer = combineReducers({
    isBookmarkDrawerOpen: createReducer(defaultState.isBookmarkDrawerOpen)
        .handleAction([setBookmarkDrawerOpen], (state, action) => action.payload)
    ,
});
import {combineReducers} from 'redux';
import {StateType} from "typesafe-actions";

import {appReducer} from "./appReducer";
import {bookReducer} from "./bookReducer";

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
    app: appReducer,
    book: bookReducer
});

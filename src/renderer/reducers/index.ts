import {combineReducers} from 'redux';
import {StateType} from "typesafe-actions";

import {bookReducer} from "./bookReducer";

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
    book: bookReducer
});

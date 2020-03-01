import { combineReducers } from 'redux';
import {createReducer} from "typesafe-actions";

import {bookReducer, BookState} from "./bookReducer";

export interface RootState {
    book: BookState;
}

export const rootReducer = combineReducers({
    book: bookReducer
});

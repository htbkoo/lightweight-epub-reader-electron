import { combineReducers } from 'redux';

import {bookReducer, BookState} from "./bookReducer";

export interface RootState {
    book: BookState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    book: bookReducer
});

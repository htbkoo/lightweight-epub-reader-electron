import {combineReducers} from 'redux';
import {Book} from "epub-chinese-converter";
import {createReducer} from "typesafe-actions";

import {setBookContent} from '../actions/bookActions';

export interface BookState {
    readonly bookWithMeta?: Book.BookWithMeta;
}

const defaultState = {
    bookWithMeta: null
};

export const bookReducer = combineReducers({
    isLoadingBook: createReducer(false),
    bookWithMeta: createReducer<Book.BookWithMeta>(defaultState.bookWithMeta)
        .handleAction([setBookContent], (state, action) => action.payload)
});
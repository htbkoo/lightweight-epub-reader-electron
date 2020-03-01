import {combineReducers} from 'redux';
import {Book} from "epub-chinese-converter";
import {createReducer, StateType} from "typesafe-actions";

import {notifyLoadingBook, setBookContent} from '../actions/bookActions';

export type BookState = StateType<typeof bookReducer>;

const defaultState = {
    isLoadingBook: false,
    bookWithMeta: null,
};

export const bookReducer = combineReducers({
    isLoadingBook: createReducer(defaultState.isLoadingBook)
        .handleAction([setBookContent], () => false)
        .handleAction([notifyLoadingBook], () => true),
    bookWithMeta: createReducer<Book.BookWithMeta>(defaultState.bookWithMeta)
        .handleAction([setBookContent], (state, action) => action.payload)
});
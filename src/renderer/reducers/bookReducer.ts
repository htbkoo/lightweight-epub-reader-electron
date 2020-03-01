import {combineReducers} from 'redux';
import {Book} from "epub-chinese-converter";
import {createReducer, StateType} from "typesafe-actions";

import {notifyLoadingBook, setBookContent, setBookFileName} from '../actions/bookActions';

export type BookState = StateType<typeof bookReducer>;

const defaultState = {
    isLoadingBook: false,
    fileName: null,
    bookWithMeta: null,
};

export const bookReducer = combineReducers({
    isLoadingBook: createReducer(defaultState.isLoadingBook)
        .handleAction([setBookContent], () => false)
        .handleAction([notifyLoadingBook], () => true)
    ,
    fileName: createReducer<string>(defaultState.fileName)
        .handleAction([setBookFileName], (state, action) => action.payload)
    ,
    bookWithMeta: createReducer<Book.BookWithMeta>(defaultState.bookWithMeta)
        .handleAction([setBookContent], (state, action) => action.payload)
    ,
});
import {Reducer} from 'redux';
import {Book} from "epub-chinese-converter";

import {BookAction, SET_BOOK_CONTENT} from '../actions/bookActions';

export interface BookState {
    readonly bookWithMeta?: Book.BookWithMeta;
}

const defaultState: BookState = {
    bookWithMeta: undefined
};

export const bookReducer: Reducer<BookState, BookAction> = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case SET_BOOK_CONTENT:
            return {
                ...state,
                bookWithMeta: action.book
            };
        default:
            return state;
    }
};

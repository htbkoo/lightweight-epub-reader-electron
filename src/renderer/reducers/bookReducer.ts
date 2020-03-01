import {Reducer} from 'redux';
import {Book} from "epub-chinese-converter";

import {BookAction, LOAD_BOOK} from '../actions/bookActions';

export interface BookState {
    readonly bookWithMeta?: Book.BookWithMeta;
}

const defaultState: BookState = {
    bookWithMeta: undefined
};

export const bookReducer: Reducer<BookState> = (
    state = defaultState,
    action: BookAction
) => {
    switch (action.type) {
        case LOAD_BOOK:
            return {
                ...state,
                bookWithMeta: action.book
            };
        default:
            return state;
    }
};

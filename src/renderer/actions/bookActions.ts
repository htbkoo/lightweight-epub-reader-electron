import { Action, ActionCreator } from 'redux';
import {Book} from "epub-chinese-converter";

export const SET_BOOK_CONTENT = 'SET_BOOK_CONTENT';

export interface SetBookContentAction extends Action {
    type: typeof SET_BOOK_CONTENT;
    book: Book.BookWithMeta
}

export const setBookContent: ActionCreator<SetBookContentAction> = (book: Book.BookWithMeta) => ({
    type: SET_BOOK_CONTENT,
    book
});

export type BookAction = SetBookContentAction;

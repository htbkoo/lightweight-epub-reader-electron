import { Action, ActionCreator } from 'redux';
import {Book} from "epub-chinese-converter";

export const LOAD_BOOK = 'LOAD_BOOK';

export interface LoadBookAction extends Action {
    type: typeof LOAD_BOOK;
    book: Book.BookWithMeta
}

export const loadBook: ActionCreator<LoadBookAction> = (book: Book.BookWithMeta) => ({
    type: LOAD_BOOK,
    book
});

export type BookAction = LoadBookAction;

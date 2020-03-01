import {Book} from "epub-chinese-converter";
import {createAction} from "typesafe-actions";

export const setBookContent = createAction('SET_BOOK_CONTENT')<Book.BookWithMeta>();

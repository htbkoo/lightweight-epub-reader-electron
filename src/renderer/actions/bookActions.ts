import {Book} from "epub-chinese-converter";
import {createAction} from "typesafe-actions";

// export interface SetBookContentAction extends Action {
//     type: typeof SET_BOOK_CONTENT;
//     book: Book.BookWithMeta
// }
// export type SetBookContentAction = typeof setBookContent;

export const setBookContent = createAction('SET_BOOK_CONTENT')<Book.BookWithMeta>();
export const setBookFileName = createAction('SET_BOOK_FILE_NAME')<string>();

// export const setBookContent: ActionCreator<SetBookContentAction> = (book: Book.BookWithMeta) => ({
//     type: SET_BOOK_CONTENT,
//     book
// });

// export type BookAction = SetBookContentAction;

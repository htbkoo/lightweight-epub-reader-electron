import {BookState} from "../../src/renderer/reducers/bookReducer";

export function createBookState(override: Partial<BookState> = {}): BookState {
    return {isLoadingBook: false, fileName: null, bookWithMeta: null, ...override};
}
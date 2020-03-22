import {AppState} from "../../src/renderer/reducers/appReducer";
import {BookState} from "../../src/renderer/reducers/bookReducer";

export function createAppState(override: Partial<AppState> = {}): AppState {
    return {isBookmarkDrawerOpen: false, ...override};
}

export function createBookState(override: Partial<BookState> = {}): BookState {
    return {isLoadingBook: false, fileName: null, bookWithMeta: null, ...override};
}
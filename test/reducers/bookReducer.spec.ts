import {bookReducer} from "../../src/renderer/reducers/bookReducer";
import {notifyLoadingBook, setBookContent, setBookFileName} from "../../src/renderer/actions/bookActions";
import {Book} from "epub-chinese-converter";
import {createBookState} from "../utils/testUtils";

describe('bookReducer', () => {
    it('should set bookWithMeta to book and isLoadingBook to false upon setBookContent', () => {
        // given
        const bookWithMeta: Book.BookWithMeta = {metadata: {}, chapters: {}};
        const prevState = createBookState();

        // when
        const newState = bookReducer(prevState, setBookContent(bookWithMeta));

        // then
        expect(newState.isLoadingBook).toEqual(false);
        expect(newState.bookWithMeta).toEqual(bookWithMeta);
    });

    it('should set isLoadingBook to true upon notifyLoadingBook', () => {
        // given
        const prevState = createBookState();

        // when
        const newState = bookReducer(prevState, notifyLoadingBook());

        // then
        expect(newState.isLoadingBook).toEqual(true);
    });

    it('should set filename to book file name upon setBookFileName', () => {
        // given
        const fileName = "someBookFileName";
        const prevState = createBookState();

        // when
        const newState = bookReducer(prevState, setBookFileName(fileName));

        // then
        expect(newState.fileName).toEqual(fileName);
    });
});
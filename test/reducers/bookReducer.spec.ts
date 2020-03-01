import {bookReducer} from "../../src/renderer/reducers/bookReducer";
import {setBookContent} from "../../src/renderer/actions/bookActions";
import {Book} from "epub-chinese-converter";

describe('bookReducer', () => {
    it('should set bookWithMeta to book and isLoadingBook to false upon setBookContent', () => {
        // given
        const bookWithMeta: Book.BookWithMeta = {metadata: {}, chapters: {}};
        const prevState = {
            isLoadingBook: true,
            bookWithMeta: undefined,
        };

        // when
        const newState = bookReducer(prevState, setBookContent(bookWithMeta));

        // then
        expect(newState.isLoadingBook).toEqual(false);
        expect(newState.bookWithMeta).toEqual(bookWithMeta);
    });
});

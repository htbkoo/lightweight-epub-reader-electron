import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Book} from "epub-chinese-converter";

import BookTextArea from '../../src/renderer/components/BookTextArea';
import {BookState} from "../../src/renderer/reducers/bookReducer";

describe('<BookTextArea/>', () => {
    it('renders to "No book chosen yet" when no book loaded yet', () => {
        // when
        const tree = renderer
            .create(<BookTextArea book={createState()}/>)
            .toJSON();

        // then
        expect(tree).toMatchSnapshot();
    });

    it('renders "Loading..." correctly when isLoadingBook', () => {
        // given
        const isLoadingBook = true;

        // when
        const tree = renderer
            .create(<BookTextArea book={createState({isLoadingBook})}/>)
            .toJSON();

        // then
        expect(tree).toMatchSnapshot();
    });

    it('renders book content correctly when book loaded', () => {
        // given
        const bookWithMeta: Book.BookWithMeta = {
            chapters: {
                ch1: {text: "this is chapter 1"},
                ch2: {text: "this is chapter 2"},
            },
            metadata: {}
        };

        // when
        const tree = renderer
            .create(<BookTextArea book={createState({bookWithMeta})}/>)
            .toJSON();

        // then
        expect(tree).toMatchSnapshot();
    });

    function createState(override: Partial<BookState> = {}) {
        return {isLoadingBook: false, bookWithMeta: null, ...override};
    }
});

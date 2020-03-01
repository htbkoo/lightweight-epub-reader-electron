import * as React from 'react';
import * as renderer from 'react-test-renderer';

import BookTextArea from '../../src/renderer/components/BookTextArea';
import {Book} from "epub-chinese-converter";

describe('<BookTextArea/>', () => {
    it('renders to "No book chosen yet" when book not loaded correctly', () => {
        const tree = renderer
            .create(<BookTextArea book={undefined}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when book loaded', () => {
        // given
        const book: Book.BookWithMeta = {
            chapters: {
                ch1: {text: "this is chapter 1"},
                ch2: {text: "this is chapter 2"},
            }, metadata: {}
        };

        const tree = renderer
            .create(<BookTextArea book={book}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

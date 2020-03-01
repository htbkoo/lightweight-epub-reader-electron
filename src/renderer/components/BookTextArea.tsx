import * as React from 'react';
import createDOMPurify from "dompurify";

import {BookState} from "../reducers/bookReducer";

interface Props {
    book: BookState
}

const DOMPurify = createDOMPurify(window);

const BookTextArea = ({book}: Props) => {
    console.log(`at BookTextArea, book: ${book}`);

    if (book.bookWithMeta) {
        const chapters = book.bookWithMeta.chapters;
        return (
            <div>
                {Object.keys(chapters).map(chapterId => (
                    <div key={chapterId}
                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(chapters[chapterId].text)}}/>
                ))}
            </div>
        );
    } else {
        if (book.isLoadingBook) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>No book chosen yet</div>
            );
        }
    }
};

export default BookTextArea;

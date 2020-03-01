import * as React from 'react';
import {Book} from "epub-chinese-converter";

export interface Props {
    book?: Book.BookWithMeta
}

const BookTextArea = ({book}: Props) => {
    console.log(`at BookTextArea, book: ${book}`);

    if (book) {
        const chapters = book.chapters;
        return (
            <div>
                {Object.keys(chapters).map(chapterId => (
                    <div key={chapterId} dangerouslySetInnerHTML={{__html: chapters[chapterId].text}}/>
                ))}
            </div>
        );
    } else {
        return (
            <div>No book chosen yet</div>
        );
    }
};

export default BookTextArea;

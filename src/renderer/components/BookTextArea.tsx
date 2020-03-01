import * as React from 'react';
import {Book} from "epub-chinese-converter/dist/typings";

const BookTextArea = ({book}: { book: Book.BookWithMeta }) => {
    const chapters = book.chapters;
    return (
        <div>
            {Object.keys(chapters).map(chapterId => (
                <div key={chapterId} dangerouslySetInnerHTML={{__html: chapters[chapterId].text}}/>
            ))}
        </div>
    )
};

export default BookTextArea;

import * as React from 'react';
import Button from '@material-ui/core/Button';

import {BookState} from "../reducers/bookReducer";

interface Props {
    book: BookState
}

// text id href media-type title order level</div>
const BookmarkBar = ({book}: Props) => {
    console.log(`at BookmarkBar`);

    if (book.bookWithMeta) {
        const chapters = book.bookWithMeta.chapters;
        return (
            <div style={{wordBreak: "break-word"}}>
                {Object.keys(chapters).map(chapterId => (
                    <div>
                        <Button key={chapterId} color="secondary" href={`#${chapterId}`}>
                            {getLinkText(chapters, chapterId)}
                        </Button>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div/>
        );
    }
};

function getLinkText(chapters, chapterId) {
    const chapter = chapters[chapterId];

    const array = [];
    if ('order' in chapter) {
        array.push(chapter.order);
    }

    if ('title' in chapter) {
        array.push(chapter.title);
    }

    if (array.length > 0) {
        return array.join(' - ');
    } else {
        return chapterId;
    }
}

export default BookmarkBar;

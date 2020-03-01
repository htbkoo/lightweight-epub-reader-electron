import * as React from 'react';
import {Book, createSimplifiedToTraditionalConverter, readEpub} from "epub-chinese-converter";

import {getElectronDialog} from "../helpers/helpers";
import {BookState} from "../reducers/bookReducer";

const converter = createSimplifiedToTraditionalConverter();

interface Props {
    book: BookState;
    setBookContent: (book: Book.BookWithMeta) => any;
    setFileName: (fileName: string) => any;
    notifyLoadingBook: () => any;
}

const LoadBookPanel = ({book, notifyLoadingBook, setFileName, setBookContent}: Props) => {
    return (
        <form className="form-horizontal">
            <div className="form-group">
                <button onClick={e => {
                    e.preventDefault();
                    setBookContent(converter.convertBook(book.bookWithMeta))
                }}>
                    To Traditional Chinese
                </button>
                <EpubFilePicker onFilePathChange={handleFilePathChange} book={book}/>
            </div>
        </form>
    );

    function handleFilePathChange(bookUrl: string) {
        notifyLoadingBook();
        setFileName(bookUrl);
        return readEpub(bookUrl).then(setBookContent);
    }
};

function EpubFilePicker({book, onFilePathChange}: { book: BookState, onFilePathChange: (filePath: string) => void }) {
    return (
        <>
            <label htmlFor="file-path-input">Epub file:</label>
            <input type="file" id="file-path-input" onClick={handleFileButtonClick}/>
            <p className="help-block">{getHelpText(book)}</p>
        </>
    );

    function handleFileButtonClick(evt) {
        evt.preventDefault();

        getElectronDialog().showOpenDialog({properties: ['openFile',], filters: [{name: "epub", extensions: ['epub']}]})
            .then(({canceled, filePaths}) => {
                if (!canceled && filePaths) {
                    console.log(`opened: ${JSON.stringify(filePaths)}`);
                    return onFilePathChange(filePaths[0]);
                }
            });
    }
}

function getHelpText(book: BookState) {
    if (book.isLoadingBook) {
        return ``;
    } else if (book.bookWithMeta || book.fileName) {
        const array = [];

        // TODO: migrate to something like safe get
        if (book.bookWithMeta && book.bookWithMeta.metadata) {
            if ('title' in book.bookWithMeta.metadata) {
                array.push(book.bookWithMeta.metadata.title);
            }
            if ('creator' in book.bookWithMeta.metadata) {
                array.push(book.bookWithMeta.metadata.creator);
            }
        }
        if (book.fileName) {
            array.push(book.fileName);
        }
        return array.join(' - ');
    } else {
        return `Please choose an epub file.`;
    }
}

export default LoadBookPanel;


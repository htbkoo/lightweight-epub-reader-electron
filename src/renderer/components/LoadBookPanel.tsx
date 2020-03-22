import * as React from 'react';
import {Book, createSimplifiedToTraditionalConverter, readEpub} from "epub-chinese-converter";
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {getElectronDialog} from "../helpers/helpers";
import {BookState} from "../reducers/bookReducer";
import { ButtonMouseEvent } from '../types';

const converter = createSimplifiedToTraditionalConverter();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }),
);

export interface Props {
    book: BookState;
    setBookContent: (book: Book.BookWithMeta) => any;
    setFileName: (fileName: string) => any;
    notifyLoadingBook: () => any;
}

const LoadBookPanel = ({book, notifyLoadingBook, setFileName, setBookContent}: Props) => {
    return (
        <form className="form-horizontal">
            <div className="form-group">
                <Button variant="contained" onClick={handleTranslateButtonClick} size="small">
                    To Traditional Chinese
                </Button>
                <EpubFilePicker onFilePathChange={handleFilePathChange} book={book} />
            </div>
        </form>
    );

    function handleTranslateButtonClick(e: ButtonMouseEvent){
        e.preventDefault();
        if (book.bookWithMeta){
            setBookContent(converter.convertBook(book.bookWithMeta))
        }
    }

    function handleFilePathChange(bookUrl: string) {
        notifyLoadingBook();
        setFileName(bookUrl);
        return readEpub(bookUrl).then(setBookContent);
    }
};

function EpubFilePicker({book, onFilePathChange}: { book: BookState, onFilePathChange: (filePath: string) => void }) {
    const classes = useStyles();

    return (
        <>
            <input className={classes.input} type="file" id="file-path-input" onClick={handleFileButtonClick}/>
            <label htmlFor="file-path-input">
                <Button variant="contained" component="span" size="small">
                    Choose Epub file
                </Button>
            </label>
            <p className="help-block">{getHelpText(book)}</p>
        </>
    );

    function handleFileButtonClick(evt: ButtonMouseEvent) {
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


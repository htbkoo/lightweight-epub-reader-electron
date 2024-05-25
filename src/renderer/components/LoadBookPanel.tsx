import * as React from 'react';
import clsx from 'clsx';
import {Book, createSimplifiedToTraditionalConverter, readEpub} from "epub-chinese-converter";
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {BookState} from "../reducers/bookReducer";
import {ButtonMouseEvent} from './types';
import {AppState} from "../reducers/appReducer";

// const converter = createSimplifiedToTraditionalConverter();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        input: {
            display: 'none',
        },
        container: {
            display: "flex",
            alignItems: "center",
        },
        inline: {
            display: "inline"
        }
    }),
);

export interface Props {
    app: AppState;
    book: BookState;
    setBookContent: (book: Book.BookWithMeta) => any;
    setBookError: (error: unknown) => any;
    setFileName: (fileName: string) => any;
    notifyLoadingBook: () => any;
    setDrawerOpen: (open: boolean) => any;
}

const LoadBookPanel = ({app, book, notifyLoadingBook, setFileName, setBookContent, setBookError, setDrawerOpen}: Props) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, "form-group")}>
            {/*TODO: investigate if `form` is necessary and clean up if not*/}
            <form className="form-horizontal">
                <div className={classes.container}>
                    <div className={classes.inline}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuButtonClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>

                    <div className={clsx(classes.inline, classes.title)}>
                        <EpubFilePicker onFilePathChange={handleFilePathChange} book={book}/>
                    </div>

                    <div className={classes.inline}>
                        <Button variant="contained" onClick={handleTranslateButtonClick} size="small" color="secondary">
                            To Traditional Chinese
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );

    function handleMenuButtonClick(e: ButtonMouseEvent) {
        e.preventDefault();

        // TODO: move this to redux store / selector to keep the state properly
        const isBookLoaded = book.bookWithMeta;

        const shouldOpenBookmarkDrawer = isBookLoaded && !app.isBookmarkDrawerOpen;
        return setDrawerOpen(shouldOpenBookmarkDrawer);
    }

    function handleTranslateButtonClick(e: ButtonMouseEvent) {
        e.preventDefault();
        if (book.bookWithMeta) {
            // setBookContent(converter.convertBook(book.bookWithMeta))
        }
    }

    function handleFilePathChange(bookUrl: string) {
        notifyLoadingBook();
        setFileName(bookUrl);
        // return readEpub(bookUrl).then(setBookContent).catch(setBookError);
    }
};

function EpubFilePicker({book, onFilePathChange}: { book: BookState, onFilePathChange: (filePath: string) => void }) {
    const classes = useStyles();

    return (
        <>
            <input className={classes.input} type="file" id="file-path-input" onClick={handleFileButtonClick}/>
            <label htmlFor="file-path-input">
                <Button variant="contained" component="span" size="small" color="secondary">
                    {getLoadButtonText(book)}
                </Button>
            </label>
        </>
    );

    function handleFileButtonClick(evt: ButtonMouseEvent) {
        evt.preventDefault();
          ipcApi.openEpubFile()
          .then((filePaths) => {
              if (filePaths === undefined) { return } // Dialog was cancelled

              console.log(`opened: ${JSON.stringify(filePaths)}`);
              return onFilePathChange(filePaths[0]);
          })
    }
}

function getLoadButtonText(book: BookState) {
    if (book.isLoadingBook) {
        return `Loading`;
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
        } else if (book.fileName) {
            array.push(book.fileName);
        }
        return array.join(' - ');
    } else {
        return `Choose an epub file`;
    }
}

export default LoadBookPanel;


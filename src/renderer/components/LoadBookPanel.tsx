import * as React from 'react';
import {Book, readEpub} from "epub-chinese-converter";

import {getElectronDialog} from "../helpers/helpers";

export interface Props {
    loadBook: (book: Book.BookWithMeta) => any
}

const LoadBookPanel = ({loadBook}: Props) => {
    return (
        <form className="form-horizontal">
            <div className="form-group">
                <EpubFilePicker onFilePathChange={bookUrl => readEpub(bookUrl).then(loadBook)}/>
            </div>
        </form>
    )
};

function EpubFilePicker({onFilePathChange}: { onFilePathChange: (filePath: string) => void }) {
    return (
        <>
            <label htmlFor="file-path-input">Epub file:</label>
            <input type="file" id="file-path-input" accept=".epub" onClick={handleFileButtonClick}/>
            <p className="help-block">Please choose an epub file.</p>
        </>
    );

    function handleFileButtonClick(evt) {
        evt.preventDefault();

        getElectronDialog().showOpenDialog({properties: ['openFile',]})
            .then(({canceled, filePaths}) => {
                if (!canceled && filePaths) {
                    console.log(`opened: ${JSON.stringify(filePaths)}`);
                    return onFilePathChange(filePaths[0]);
                }
            });
    }
}

export default LoadBookPanel;


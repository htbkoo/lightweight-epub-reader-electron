import * as React from 'react';
import {Book, readEpub} from "epub-chinese-converter";

import {getElectronDialog} from "../helpers/helpers";

interface Props {
    setBookContent: (book: Book.BookWithMeta) => any;
    setFileName: (fileName: string) => any;
    notifyLoadingBook: () => any;
}

const LoadBookPanel = ({notifyLoadingBook, setFileName, setBookContent}: Props) => {
    return (
        <form className="form-horizontal">
            <div className="form-group">
                <EpubFilePicker onFilePathChange={handleFilePathChange}/>
            </div>
        </form>
    );

    function handleFilePathChange(bookUrl: string){
        notifyLoadingBook();
        setFileName(bookUrl);
        return readEpub(bookUrl).then(setBookContent);
    }
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


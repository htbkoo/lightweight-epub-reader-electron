import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {readEpub} from "epub-chinese-converter";
import {Book} from "epub-chinese-converter/dist/typings";

import BookTextArea from "./BookTextArea";

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

        (window as any).electron.dialog.showOpenDialog({properties: ['openFile',]})
            .then(({canceled, filePaths}) => {
                if (!canceled && filePaths) {
                    console.log(`opened: ${JSON.stringify(filePaths)}`);
                    // return loadEpubToTextArea(filePaths[0]);
                    return onFilePathChange(filePaths[0]);
                }
            });
    }
}

const styles = {
    "container": {"backgroundColor": "#111", "color": "aliceblue", "height": "100%"},
    "body": {"padding": "25px"},
    "ebook_content": {}
};

const Application = () => {
    const [book, setBook] = React.useState<Book.BookWithMeta | undefined>(undefined);

    const bookTextAreaIfLoaded = book
        ? (<BookTextArea book={book}/>)
        : (<div>No book chosen yet</div>);

    return (
        <div id="react-mount" className="container-fluid" style={styles.container}>
            <div style={styles.body}>
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <EpubFilePicker onFilePathChange={bookUrl => readEpub(bookUrl).then(setBook)}/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="ebook-content panel-body" style={styles.ebook_content}>
                                {bookTextAreaIfLoaded}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default hot(Application);

import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {useState} from 'react';
import * as electron from "electron";
import {readEpub} from "epub-chinese-converter";
import * as path from "path";
import {Book} from "epub-chinese-converter/dist/typings";
import {dialog} from "electron";

import BookTextArea from "./BookTextArea";

function renderer() {
    console.log("at renderer.ts");

    const $ = require('jquery');

    const $ebookTextArea = $(".ebook-content");
    const $fileInput = $("#file-path-input");

    $fileInput.on("change", t => {
        console.log(t);
        console.log(JSON.stringify(t));
    });

    $fileInput.on("click", evt => {
        evt.preventDefault();

        dialog.showOpenDialog({properties: ['openFile',]})
            .then(({canceled, filePaths}) => {
                if (!canceled && filePaths) {
                    console.log(`opened: ${JSON.stringify(filePaths)}`);
                    return loadEpubToTextArea(filePaths[0]);
                }
            });
    });

    async function loadEpubToTextArea(filepath: string) {
        $ebookTextArea.text(`Loading ebook from "${filepath}"`);

        return readEpub(filepath)
            .then(book => {
                $ebookTextArea.text(convertBookAsString(book));
            });

        function convertBookAsString({chapters}): string {
            console.log("at convertBookAsString");
            return Object.keys(chapters)
                .map(id => chapters[id].text)
                .toString();
        }
    }
}

function EpubFilePicker({onFilePathChange}: { onFilePathChange: (filePath: string) => void }) {
    return (
        <>
            <label htmlFor="file-path-input">Epub file:</label>
            <input type="file" id="file-path-input" accept=".epub" onClick={handleFileButtonClick}/>
            {/*<input type="file" id="file-path-input" accept=".epub" onChange={event => {console.log(event)}}/>*/}
            <p className="help-block">Please choose an epub file.</p>
        </>
    );

    function handleFileButtonClick(evt) {
        evt.preventDefault();

        // (window as any).dialog.showOpenDialog({properties: ['openFile',]})
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
    "body": {"padding": "25px", "backgroundColor": "#111", "color": "aliceblue",},
    "ebook_content": {}
};

const Application = () => {
    const [book, setBook] = useState<Book.BookWithMeta | undefined>(undefined);

    // const bookUrl = path.normalize(`${__dirname}/../../../resources/book.epub`);
    // const bookUrl = path.normalize(`./resources/book.epub`);
    // console.log(__dirname);
    // console.log(bookUrl);

    // electron.ipcRenderer.send('variable-request', ['somevar', 'anothervar']);
    // electron.ipcRenderer.on('variable-reply', (event, args) => {
    //     console.log(args[0]); // "name"
    //     console.log(args[1]); // 33
    //     setBook(args[1]);
    // });

    const bookTextAreaIfLoaded = book
        ? (<BookTextArea book={book}/>)
        : (<div>No book chosen yet</div>);

    return (
        <div className="container-fluid" style={styles.body}>
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
    )
};

export default hot(Application);

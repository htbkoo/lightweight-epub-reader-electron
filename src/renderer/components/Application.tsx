import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {useState} from 'react';
import * as electron from "electron";
import {readEpub} from "epub-chinese-converter";
import * as path from "path";

const Application = () => {
    const [book, setBook] = useState<any>(undefined);

    // electron.ipcRenderer.send('variable-request', ['somevar', 'anothervar']);
    // electron.ipcRenderer.on('variable-reply', (event, args) => {
    //     console.log(args[0]); // "name"
    //     console.log(args[1]); // 33
    //     setBook(args[1]);
    // });

    if (book) {
        return (
            <div>
                Loaded
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
};

export default hot(Application);

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import {readEpub} from "epub-chinese-converter";

(function () {
    console.log("at renderer.ts");

    const {dialog} = require('electron').remote;
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
})();
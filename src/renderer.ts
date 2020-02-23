// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

(function () {
    console.log("at renderer.ts");

    const {readEpub} = require('epub-chinese-converter');
    const path = require('path');
    const $ = require('jquery');

    const $ebookTextArea = $(".ebook-content");
    const $fileInput = $("#file-path-input");

    $fileInput.on("change", t => {
        console.log(t);
        console.log(JSON.stringify(t));
    });

    $fileInput.on("click", evt => {
        evt.preventDefault();

        // const {dialog} = require('electron');
        const {dialog} = require('electron').remote;
        // console.log(dialog.showOpenDialog({properties: ['openFile', 'multiSelections']}));

        dialog.showOpenDialog({properties: ['openFile',]})
            .then(({canceled,filePaths }) => {
                /*
                opened: {"canceled":true,"filePaths":[]}
                opened: {"canceled":false,"filePaths":["C:\\Users\\Hey\\Desktop\\PROJECTS\\self\\electron-quick-start-typescript\\resources\\book.epub"]}
                * */
                if (!canceled && filePaths){
                    console.log(`opened: ${JSON.stringify(filePaths)}`);

                }
            });
    });

    $(() => {
        const BOOK_URL = path.normalize(`${__dirname}/../resources/book.epub`);
        $ebookTextArea.text(`Loading ebook from "${BOOK_URL}"`);

        readEpub(BOOK_URL)
            .then(book => {
                $ebookTextArea.text(convertBookAsString(book));
            });

        function convertBookAsString({chapters}) {
            console.log("at convertBookAsString");
            return Object.keys(chapters)
                .map(id => chapters[id].text)
                .toString();
        }
    });
})();
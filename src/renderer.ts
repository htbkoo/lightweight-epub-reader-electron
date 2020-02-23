// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

(function(){
    const {readEpub} = require('epub-chinese-converter');
    const path = require('path');
    const $ = require('jquery');

    $(() => {
        const $ebookTextArea = $(".ebook-content");
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
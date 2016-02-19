import application from './application'
import { syncFiles } from './collections/tracks'

window._ = require('underscore');

cozysdk.defineRequest('File', 'music', (doc) => {
        if (doc.class == 'music') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
        console.log('FILEMUSICREQ', error, response);
        cozysdk.defineRequest('Track', 'all', (doc) => {
                emit(doc._id, doc);
            }, (error, response) => {
                console.log('ALLTRACKREQ', error, response);
                start();
        });
});




const sync = document.querySelector("#sync-from-files");
sync.addEventListener("click", () => {
    syncFiles();
}, false);

function start() {
    application.start();
}


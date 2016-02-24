import application from './application'
import { syncFiles } from './collections/tracks'


function defineRequestFileMusic() {
    cozysdk.defineRequest('File', 'music', (doc) => {
            if (doc.class == 'music') {
                emit(doc._id, doc);
            }
        }, (error, response) => {
            console.log('FILEMUSICREQ', error, response);
            defineRequestTrackAll();

    });
}

function defineRequestTrackAll() {
    cozysdk.defineRequest('Track', 'all', (doc) => {
            emit(doc._id, doc);
        }, (error, response) => {
            console.log('ALLTRACKREQ', error, response);
            defineRequestTrackNotHidden();
    });
}

function defineRequestTrackNotHidden() {
    cozysdk.defineRequest('Track', 'playable', (doc) => {
            if (!doc.hidden) {
                emit(doc._id, doc);
            }
        }, (error, response) => {
            console.log('PLAYABLEREQ', error, response);
            start();
    });
}

function start() {
    application.start();
}


window.player = document.querySelector("#player");

const sync = document.querySelector("#sync-from-files");
sync.addEventListener("click", () => {
    syncFiles();
}, false);

defineRequestFileMusic()

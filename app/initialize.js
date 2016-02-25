import application from './application';
import { syncFiles } from './libs/file';
import scdl from './libs/soundcloud';


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
            defineRequestTrackFile();
    });
}

function defineRequestTrackFile() {
    cozysdk.defineRequest('Track', 'file', (doc) => {
            if (doc.ressource.type == "file") {
                emit(doc._id, doc);
            }
        }, (error, response) => {
            console.log('TRACKFILEREQ', error, response);
            defineRequestTrackSoundcloud();
    });
}

function defineRequestTrackSoundcloud() {
    cozysdk.defineRequest('Track', 'soundcloud', (doc) => {
            if (doc.ressource.type == "soundcloud") {
                emit(doc._id, doc);
            }
        }, (error, response) => {
            console.log('TRACKSCREQ', error, response);
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

const importSC = document.querySelector("#import");
const importURL = document.querySelector("#import-text");
importSC.addEventListener("click", () => {
    scdl.import(importURL.value);
}, false);

defineRequestFileMusic()

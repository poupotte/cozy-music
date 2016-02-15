import application from './application'
window._ = require('underscore');

console.log('start');

cozysdk.defineRequest('File', 'getMusicFiles', (doc) => {
        if (doc.class == 'music') {
            emit(doc);
        }
    }, (error, response) => {
        console.log('FILEMUSICREQ', error, response);
        run();
});

cozysdk.defineRequest('Track', 'getAllTrack', (doc) => {
        emit(doc);
    }, (error, response) => {
        console.log('ALLTRACKREQ', error, response);
});

function run() {
    application.start();
}


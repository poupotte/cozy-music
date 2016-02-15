import Backbone from 'backbone'
import Track from '../models/track'

cozysdk.defineRequest('File', 'getMusicFile', (doc) => {
    type = file.headers['content-type']
    if (type.split('/')[0] == 'audio') {
        emit(doc);
    }
});

cozysdk.defineRequest('Track', 'getAllTrack', (doc) => {
    emit(doc);
});

/*
cozysdk.run('Files', 'getMusic', {}, (error, response) => {
    console.log(error, response);
});
*/

const Tracks = Backbone.Collection.extend({
    model: Track,
    sync: (method, model, options) => {
        if (method == 'read') {
            console.log('fetch');
            cozysdk.run('Track', 'getAllTrack', {}, (error, response) => {
                console.log('getAllTrack', error, response);
            });
        }
    }
});

export default Tracks;
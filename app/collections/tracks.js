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
        switch (method) {
            case 'create':
                cozysdk.create('Tracks', model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'read':
                cozysdk.find('Tracks', model.id, (error, response) => {
                    console.log(error, response);
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Tracks', model.id, model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'delete':
                cozysdk.destroy('Tracks', model.id, (error, response) => {
                    console.log(error, response);
                });
                break;
        }
    }
});

export default Tracks;
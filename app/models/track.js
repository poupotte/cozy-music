import Backbone from 'backbone'

cozysdk.defineRequest('files', 'getMusic', (doc) => {
    type = file.headers['content-type']
    if (type.split('/')[0] == 'audio') {
        emit(doc);
    }
});

cozysdk.run('Files', 'getMusic', {}, (error, response) => {
    console.log(error, response);
});

const Track = Backbone.Model.extend({
    urlRoot: '/track',
    defaults: {
        id: '',
        track: '',
        artist: ''
    },
    sync: (method, model, options) => {
        switch (method) {
            case 'create':
                cozysdk.create('Track', model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'read':
                cozysdk.find('Track', model.id, (error, response) => {
                    console.log(error, response);
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Track', model.id, model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'delete':
                cozysdk.destroy('Track', model.id, (error, response) => {
                    console.log(error, response);
                });
                break;
        }
    }
});


export default Track;

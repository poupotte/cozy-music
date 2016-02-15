import Backbone from 'backbone'

const Playlist = Backbone.Model.extend({
    defaults: {
        id: '',
        title: '',
        tracks: '',
        dateAdded: Date.now
    },
    sync: (method, model, options) => {
        switch (method) {
            case 'create':
                cozysdk.create('Playlist', model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'read':
                cozysdk.find('Playlist', model.id, (error, response) => {
                    console.log(error, response);
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Playlist', model.id, model, (error, response) => {
                    console.log(error, response);
                });
                break;
            case 'delete':
                cozysdk.destroy('Playlist', model.id, (error, response) => {
                    console.log(error, response);
                });
                break;
        }
    }
});


export default Playlist;

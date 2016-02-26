import Backbone from 'backbone';


const Playlist = Backbone.Model.extend({
    
    defaults: {
        _id: undefined,
        title: '',
        tracks: '',
        dateAdded: Date.now
    },

    idAttribute:'_id',

    sync: function (method, model, options) {
        switch (method) {
            case 'create':
                cozysdk.create('Playlist', model.toJSON(), (error, response) => {
                    console.log('CREATE Playlist', error, response);
                });
                break;
            case 'read':
                cozysdk.find('Playlist', model.get('_id'), (error, response) => {
                    console.log('READ Playlist', error, response);
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Playlist', model.id, model.toJSON(), (error, response) => {
                    console.log('UPDATE Playlist', error, response);
                });
                break;
            case 'delete':
                cozysdk.destroy('Playlist', model.get('_id'), (error, response) => {
                    console.log('DELETE Playlist', error, response);
                });
                break;
        }
    },
});

export default Playlist;

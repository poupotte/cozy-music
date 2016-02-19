import Backbone from 'backbone'

const Track = Backbone.Model.extend({
    defaults: {
        _id: undefined,
        playlists: '',
        metas: '',
        dateAdded: Date.now,
        plays: 0,
        ressource: ''
    },
    isNew: function() {
        console.log(!this.has("_id"));
        return !this.has("_id");
    },
    sync: function (method, model, options) {
        switch (method) {
            case 'create':
                cozysdk.create('Track', model.toJSON(), (error, response) => {
                    console.log('CREATE TRACK', error, response);
                });
                break;
            case 'read':
                cozysdk.find('Track', model.get('_id'), (error, response) => {
                    console.log('READ TRACK', error, response);
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Track', model.id, model.toJSON(), (error, response) => {
                    console.log('UPDATE TRACK', error, response);
                });
                break;
            case 'delete':
                cozysdk.destroy('Track', model.get('_id'), (error, response) => {
                    console.log('DELETE TRACK', error, response);
                });
                break;
        }
    }
});


export default Track;

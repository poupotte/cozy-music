import Backbone from 'backbone'
import scdl from '../libs/soundcloud';

const Track = Backbone.Model.extend({
    defaults: {
        _id: undefined,
        playlists: '',
        metas: '',
        dateAdded: Date.now,
        plays: 0,
        ressource: '',
        hidden: false
    },
    idAttribute:"_id",
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
    },
    getStreamURL: function (play) {
        const ressource = this.get("ressource");
        switch (ressource.type) {
            case "file":
                const id = this.get("ressource").fileID;
                cozysdk.getFileURL(id, 'file', (err, resp) => {
                    console.log("FILEURL", err, resp);
                    if (resp) {
                        resp = "http://" + resp.split('@')[1];
                        play(resp);
                    }
                })
                break;
            case "soundcloud":
                const url = this.get("ressource").url;
                play(scdl.addClientID(url));
                break;

        }
    }
});


export default Track;

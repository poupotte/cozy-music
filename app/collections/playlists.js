import Backbone from 'backbone';
import Playlist from '../models/playlist';
import cozysdk from 'cozysdk-client';
import application from '../application';


const Playlists = Backbone.Collection.extend({

    model: Playlist,

    comparator: 'title',

    initialize() {
        this.listenTo(
            application.channel,
            'delete:playlist',
            this.deletePlaylist
        );
    },

    deletePlaylist(playlist) {
        this.remove(playlist);
        playlist.destroy();
    },

    sync(method, model, options) {
        if (method == 'read') {
            let promise = new Promise((resolve, reject) => {
                cozysdk.run('Playlist', 'all', {}, (err, res) => {
                    if (res) {
                        if (options && options.success) {
                            options.success(res);
                            resolve(res);
                        }
                    } else {
                        if (options && options.error) {
                            options.error(err);
                            reject(err);
                        }
                    }
                });
            });
            return promise;
        }
    },

    parse(resp, options) {
        let playlists = JSON.parse('' + resp);
        let result = [];
        for (let i = 0; i < playlists.length; i++) {
            result.push(playlists[i].value);
        }
        return result;
    }
});

cozysdk.defineRequest('Playlist', 'all', (doc) => {
        emit(doc._id, doc);
    }, (error, response) => {
});

export default Playlists;

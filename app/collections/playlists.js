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
            cozysdk.run('Playlist', 'all', {}, (err, res) => {
                console.log('Playlist fetched', err, res);
                if (res) {
                    let playlists = JSON.parse('' + res);
                    for (let i = 0; i < playlists.length; i++) {
                        this.add(playlists[i].value);
                    }
                    options.success();
                }
            });
        }
    }
});

cozysdk.defineRequest('Playlist', 'all', (doc) => {
        emit(doc._id, doc);
    }, (error, response) => {
        console.log('ALLPLAYLISTREQ', error, response);
});

export default Playlists;

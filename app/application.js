import Backbone from 'backbone';
import Mn from 'backbone.marionette';
import Tracks from './collections/tracks';
import Playlist from './models/playlist';
import Playlists from './collections/playlists';
import AppLayout from './views/app_layout';
import AppState from './models/appState';
import Radio from 'backbone.radio';

require('./styles/app.styl');

let Application = Mn.Application.extend({

    _initChannel () { // Use Backbone.Radio instead of wreqr
        this.channelName = _.result(this, 'channelName') || 'global';
        this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
    },

    initialize () {
        this.appState = new AppState();
    },

    onBeforeStart () {
        // All track initialization
        let allTracks = new Tracks([], { type: 'all' });

        allTracks.fetch({
            success: () => { // For now initialize upNext with all track
                this.allTracks.get('tracks').each(track => {
                    this.upNext.get('tracks').add(track);
                });
            }
        });
        this.allTracks = new Playlist({
            title: "All Songs",
            tracks: allTracks
        });

        // Up Next initialization
        let upNext = new Tracks([], { type: 'upNext' });

        this.upNext = new Playlist({
            title: "Up Next",
            tracks: upNext
        });

        // the default playlist is all tracks
        this.appState.set('currentPlaylist', this.allTracks);

        this.allPlaylists = new Playlists();
        this.allPlaylists.fetch();
    },

    onStart () {
        if (Backbone.history) {
            Backbone.history.start();
        }
        this.appLayout = new AppLayout();
        this.appLayout.render();
    }
});

export default new Application();

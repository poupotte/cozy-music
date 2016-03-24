import Mn from 'backbone.marionette';
import PlaylistView from './playlist';
import application from '../application';
import Playlist from '../models/playlist';


const Playlists = Mn.CompositeView.extend({

    template: require('./templates/popupPlaylists'),

    childViewContainer: '#playlist-list',

    childView: PlaylistView,

    ui: {
        addPlaylist: '#add-playlist',
        playlistText: '#playlist-text',
    },

    events: {

    },

    initialize() {
    },


});

export default Playlists;


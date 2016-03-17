import Mn from 'backbone.marionette';
import PlaylistView from './playlist';
import application from '../application';
import Playlist from '../models/playlist';


const Playlists = Mn.CompositeView.extend({

    template: require('./templates/playlists'),

    childViewContainer: '#playlist-list',

    childView: PlaylistView,

    ui: {
        addPlaylist: '#add-playlist',
        playlistText: '#playlist-text',
    },

    events: {
        'click .playlist': 'changePlaylist',
        'click @ui.addPlaylist': 'createPlaylist',
        'focusout @ui.addPlaylist': 'focusoutAddPlaylist',
        'keyup @ui.playlistText': 'keyupPlaylistText'
    },

    initialize() {
        this.listenTo(
            application.channel,
            'delete:playlist',
            this.deletedPlaylist
        );
    },

    keyupPlaylistText(e) {
        let title = this.ui.playlistText.val();
        if(e.keyCode == 13) {
            let newPlaylist = new Playlist({ title: title });
            application.allPlaylists.create(newPlaylist);
            this.ui.playlistText.val('');
            this.focusoutAddPlaylist();
        }
    },

    deletedPlaylist(playlist) {
        let currentPlaylist = application.appState.get('currentPlaylist');
        if (currentPlaylist == playlist) {
            application.appState.set('currentPlaylist', application.allTracks);
            $("#all-song").addClass('selected');
        }
    },

    focusoutAddPlaylist() {
        if (this.ui.playlistText.val() == '') {
            this.ui.addPlaylist.addClass('add-playlist').removeClass('input');
        }
    },

    changePlaylist(e) {
        let playlist = $(e.currentTarget);
        let playlists = this.$('.playlist');
        let index = playlists.index(playlist) - 2;
        playlists.removeClass('selected');
        playlist.addClass('selected');

        if (playlist.attr('id') == "up-next") {
            application.appState.set('currentPlaylist', application.upNext);
        } else if (playlist.attr('id') == "all-song") {
            application.appState.set('currentPlaylist', application.allTracks);
        } else {
            this.currentIndex = index;
            let playlist = application.allPlaylists.at(index);
            application.appState.set('currentPlaylist', playlist);
        }
    },

    createPlaylist() {
        this.ui.addPlaylist.removeClass('add-playlist').addClass('input');
        this.ui.playlistText.focus();
    }
});

export default Playlists;


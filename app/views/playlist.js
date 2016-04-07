import Mn from 'backbone.marionette';
import application from '../application';


const PlaylistView = Mn.ItemView.extend({

    template: require('./templates/playlist'),

    tagName: 'li',

    className() {
        let currentPlaylist = application.appState.get('currentPlaylist');
        let selected = currentPlaylist == this.model ? 'selected' : ''
        return 'playlist ' + selected
    },

    modelEvents: { change: 'render' }
});

export default PlaylistView;
import Backbone from 'backbone';

const AppState = Backbone.Model.extend({

    // Store variable related to the current application State
    defaults: {
        currentTrack: '',
        currentPlaylist: '',
    },

    sync(method, model, options) {
        // prevent sync
    }
});

export default AppState;

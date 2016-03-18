import Mn from 'backbone.marionette';
import application from '../application';
import Tracks from '../collections/tracks';

const Header = Mn.ItemView.extend({

    template: require('./templates/header'),

    events: {
        'click #reset-upnext': 'resetUpNext',
        'click #delete-playlist': 'deletePlaylist'
    },

    modelEvents: {
      'change:currentPlaylist': 'changedPlaylist'
   },

    initialize() {
       this.listenTo(
            this.model.get('currentPlaylist').get('tracks'),
            'update reset',
            this.render
        );
   },

    serializeData() {
        let currentPlaylist = this.model.get('currentPlaylist');
        return {
            title: currentPlaylist.get('title'),
            count: currentPlaylist.get('tracks').length
        }
    },

    // Rebind the listener to the correct playlist
    changedPlaylist(model, newValue) {
        this.stopListening(model.changed.currentPlaylist);
        this.listenTo(
            this.model.get('currentPlaylist').get('tracks'),
            'update reset',
            this.render
        );
        this.render();
    },

    deletePlaylist() {
        let currentPlaylist = this.model.get('currentPlaylist');
        application.channel.trigger('delete:playlist', currentPlaylist);
    },

    resetUpNext() {
        application.channel.trigger('reset:UpNext');
    },

});

export default Header;

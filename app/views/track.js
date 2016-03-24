import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';
import PopPlaylistView from './popupPlaylists'

const TrackView = Mn.LayoutView.extend({

    template: require('./templates/track'),

    tagName: 'li',

    ui: {
        'menu': '#menu',
        'popupMenu': '#popup-menu',
    },

    regions: {
        playlistPopup: '#playlist-popup-container',
    },

    events: {
        'click': 'play',
        'click @ui.menu': 'toggleMenu',
        'click #add-to-upnext':'addToUpNext',
        'mouseenter #add-to-playlist':'showPlaylist',
        'mouseleave #add-to-playlist':'hidePlaylist',
        'click #album-to-upnext':'albumToUpNext',
        'click #edit-details':'editDetails',
        'click #delete':'delete',
        'click #delete-from-upnext': 'deleteFromUpNext',
        'mouseleave @ui.popupMenu': 'hidePopupMenu',
    },

    modelEvents: {
        change: 'render'
    },

    initialize () {
        this.listenTo(application.appState, {
            'change:currentTrack': this.togglePlayingState
        })
    },

    onRender() {
        this.showChildView('playlistPopup', new PopPlaylistView({
            model: this.model,
            collection: application.allPlaylists
        }));
        let currentPlaylist = application.appState.get('currentPlaylist');
        let type = currentPlaylist.get('tracks').type;
        switch (type) { // Can be refactored ?
            case 'upNext':
                this.$('.actions').addClass('upNext');
                break;
            case 'all':
                this.$('.actions').addClass('all');
                break;
            case 'playlist':
                this.$('.actions').addClass('playlist');
                break;
        }
        this.togglePlayingState();
    },

    play(e) {
        application.appState.set('currentTrack', this.model);
    },

    toggleMenu(e) {
        e.stopPropagation();
        this.ui.popupMenu.toggleClass('show');
        this.ui.menu.toggleClass('active');
    },

    hidePopupMenu(e) {
        this.ui.popupMenu.removeClass('show');
        this.ui.menu.removeClass('active');
    },

    showPlaylist(e) {
        e.stopPropagation();
        application.channel.trigger('playlistPopup:show', this.model);
    },

    hidePlaylist(e)  {
        e.stopPropagation();
        application.channel.trigger('playlistPopup:hide', this.model);
        this.hidePopupMenu();
    },

    addToUpNext(e) {
        e.stopPropagation();
        application.upNext.addTrack(this.model);

        let notification = {
            status: 'ok',
            message: 'Added to Up Next'
        }
        application.channel.request('notification', notification);
    },

    deleteFromUpNext(e) {
        e.stopPropagation();
        application.upNext.removeTrack(this.model);
    },

    // TO DO
    albumToUpNext(e) {
        e.stopPropagation();
    },

    // TO DO
    editDetails(e) {
        e.stopPropagation();
    },

    delete(e) {
        let item = this.model;
        item.set('hidden', true);
        item.save();
        e.stopPropagation();
    },

    serializeData() {
        let metas = this.model.get('metas');
        return _.extend( _.defaults({}, metas, {
            artist: '',
            album: '',
            number: ''
        }), {
            duration: metas.duration? timeToString(metas.duration/1000):'--:--'
        });
    },

    togglePlayingState () {
        let isPlayed = application.appState.get('currentTrack') === this.model;
        this.$el.toggleClass('playing', isPlayed);
    },

});

export default TrackView;

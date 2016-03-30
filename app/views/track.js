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
        'click #remove-from-playlist': 'removeFromPlaylist',
        'mouseleave #popup-menu': 'hidePopupMenu',
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
        this.togglePlayingState();
    },

    play(e) {
        // Add current playlist to upNext if no track in UpNext
        let tracks = application.appState.get('currentPlaylist').get('tracks');
        if (application.upNext.get('tracks').length == 0) {
            tracks.each(track => {
                application.upNext.get('tracks').add(track);
            });
        }
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
        application.channel.trigger('playlistPopup:show', this.model);
    },

    hidePlaylist(e)  {
        application.channel.trigger('playlistPopup:hide', this.model);
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
        if (this.model == application.appState.get('currentTrack')) {
            application.channel.trigger('player:next');
        }
        application.upNext.removeTrack(this.model);
    },

    removeFromPlaylist(e) {
        e.stopPropagation();
        application.appState.get('currentPlaylist').removeTrack(this.model);
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
        let currentPlaylist = application.appState.get('currentPlaylist');
        return _.extend( _.defaults({}, metas, {
            artist: '',
            album: '',
            number: '',
            type: currentPlaylist.get('tracks').type
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

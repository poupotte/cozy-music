import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';


const TrackView = Mn.ItemView.extend({

    template: require('./templates/track'),

    tagName: 'li',

    ui: {
        'menu': '#menu',
        'popupMenu': '.popup-menu'
    },

    events: {
        'click': 'play',
        'click @ui.menu': 'toggleMenu',
        'click #add-to-upnext':'addToUpNext',
        'click #add-to-playlist':'addToPlaylist',
        'click #album-to-upnext':'albumToUpNext',
        'click #edit-details':'editDetails',
        'click #delete':'delete',
        'click #delete-from-upnext': 'deleteFromUpNext',
        'mouseleave': 'hidePopupMenu'
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

    addToPlaylist(e) {
        e.stopPropagation();
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

import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';


const TrackView = Mn.ItemView.extend({

    template: require('./templates/track'),

    tagName: 'li',

    events: {
        'click': 'play',
        'click .delete': 'delete',
        'click #menu': 'displayMenu',
        'click #add-to-upnext':'addToUpNext',
        'click #delete-from-upnext': 'deleteFromUpNext'
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
        let currentPlaylist = application.currentPlaylist;
        let type = currentPlaylist ? currentPlaylist.get('tracks').type : 'all'
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

    displayMenu(e) {
        e.stopPropagation();
    },

    addToUpNext(e) {
        e.stopPropagation();
    },

    deleteFromUpNext(e) {
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

import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';


const TrackView = Mn.ItemView.extend({

    template: require('./templates/track'),

    tagName: 'tr',

    events: {
        'click': 'play',
        'click .delete': 'delete'
    },

    modelEvents: {
        change: 'render'
    },

    initialize () {
        this.listenTo(application.appState, {
            'change:currentTrack': this.togglePlayingState
        })
    },

    play(e) {
        application.appState.set('currentTrack', this.model);
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

TrackView.prototype.onRender = TrackView.prototype.togglePlayingState;

export default TrackView;

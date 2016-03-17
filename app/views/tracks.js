import Mn from 'backbone.marionette';
import TrackView from './track';
import application from '../application';


const TracksView = Mn.CompositeView.extend({

    template: require('./templates/tracks'),

    childViewContainer: '#track-list',

    childView: TrackView,

    onRender() {
        this.setCurrentTrack();
        this.listenTo(
            application.appState,
            'change:currentTrack',
            this.setCurrentTrack
        );
    },

    onDestroy() {
        try {
            this.stopListening(); // throw weird errors
        } catch (e) {
            //console.log(e);
        }
    },

    remove() {
        this._removeElement();
        //this.stopListening(); // Overrided for now
        return this;
    },

    setCurrentTrack(appState, currentTrack) {
        if (currentTrack) {
            let item = this.children.findByModel(currentTrack);
            if (item) {
                item.$el.addClass('playing').siblings().removeClass('playing');
            }
        }
    }

});

export default TracksView;

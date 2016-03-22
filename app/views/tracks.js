import Mn from 'backbone.marionette';
import TrackView from './track';
import application from '../application';


const TracksView = Mn.CompositeView.extend({

    template: require('./templates/tracks'),

    childViewContainer: '#track-list',

    childView: TrackView,

    // Override
    remove() {
        this._removeElement();
        try {
            this.stopListening(); // Weird Error
        } catch (e) {
            //console.log('views/tracks.js', e);
        }
        return this;
    },

});

export default TracksView;

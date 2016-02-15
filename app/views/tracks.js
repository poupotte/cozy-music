import Mn from 'backbone.marionette';
import Tracks from '../collections/tracks'

const tracks = new Tracks();

const TrackView = Mn.ItemView.extend({
    tagName: 'li',
    template: require('views/templates/track')
});


const TracksView = Mn.CollectionView.extend({  
    el: '#app-hook',
    tagName: 'ul',

    childView: TrackView,

    initialize: function() {
        this.collection = tracks.fetch();
    }
});


export default TracksView;

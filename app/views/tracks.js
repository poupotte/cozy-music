import Mn from 'backbone.marionette';
import Tracks from '../collections/tracks'

const TrackView = Mn.ItemView.extend({
    tagName: 'li',
    template: require('views/templates/track'),
    serializeData: function() {
        return {
            trackname: this.model.get('metas').title
        };
    }
});


const TracksView = Mn.CollectionView.extend({  
    el: '#app-hook',
    tagName: 'ul',

    childView: TrackView,

    initialize: function() {
        const tracks = new Tracks();
        tracks.fetch();
        this.collection = tracks;
    }
});


export default TracksView;

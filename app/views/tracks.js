import Mn from 'backbone.marionette';
import Tracks from '../collections/tracks';
import TrackView from './track';

const TracksView = Mn.CollectionView.extend({  
    el: '#app-hook',
    tagName: 'ul',

    childView: TrackView,
    events: {
        'click a': 'play',
        'click .delete': 'delete'
    },
    play: function (e) {
        const id = e.currentTarget.dataset.id;
        const item = this.collection.get(id);
        item.getStreamURL(playAudio);
    },
    delete: function (e) {
        const id = e.currentTarget.dataset.id;
        const item = this.collection.get(id);
        item.set('hidden', true);
        item.save();
    },
    initialize: function() {
        const tracks = new Tracks();
        tracks.fetch();
        this.collection = tracks;
    }
});

const playAudio = function(url) {
    window.player.src = url;
    window.player.load();
    window.player.play();
}

export default TracksView;

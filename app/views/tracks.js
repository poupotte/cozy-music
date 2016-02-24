import Mn from 'backbone.marionette';
import Tracks from '../collections/tracks'

const TrackView = Mn.ItemView.extend({
    template: require('views/templates/track'),
    serializeData: function() {
        return {
            trackname: this.model.get('metas').title,
            id: this.model.get('_id')
        };
    }
});

const TracksView = Mn.CollectionView.extend({  
    el: '#app-hook',
    tagName: 'ul',

    childView: TrackView,
    events: {
        "click a": "clicked",
        "click .delete": "delete"
    },
    clicked: function (e) {
        const id = e.currentTarget.dataset.id;
        const item = this.collection.get(id);
        const ressource = item.get("ressource");
        if (ressource.fileID) {
            const id = item.get("ressource").fileID;
            cozysdk.getFileURL(id, 'file', (err, resp) => {
                console.log("FILEURL", err, resp);
                if (resp) {
                    resp = "http://" + resp.split('@')[1];
                    playAudio(resp);
                }
            })
        }
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

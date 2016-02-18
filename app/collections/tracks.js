import Backbone from 'backbone'
import Track from '../models/track'

const Tracks = Backbone.Collection.extend({
    model: Track,
    sync: function (method, model, options) {
        if (method == 'read') {
            console.log('fetch');
            cozysdk.run('Track', 'all', {}, (err, res) => {
                console.log("TRACKS fetch", err, res);
                if (res) {
                    const tracks = JSON.parse("" + res);
                    for (let i = 0; i < tracks.length; i++) {
                        this.add(tracks[i]);
                    }
                }
            });
        }
    }
});

export const syncFiles = function () {
    cozysdk.run('File', 'music', {}, (err, res) => {
        console.log("SYNC", err, res);
        if (res) {
            const tracks = JSON.parse("" + res);
            for (let i = 0; i < tracks.length; i++) {
                const trackname = tracks[i].key.name
                const t = new Track({
                    metas : { 
                        title: trackname
                    }
                });
                t.save();
            }
        }
    });
}

export default Tracks;
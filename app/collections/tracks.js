import Backbone from 'backbone'
import Track from '../models/track'

const Tracks = Backbone.Collection.extend({
    model: Track,
    sync: function (method, model, options) {
        if (method == 'read') {
            console.log('fetch');
            cozysdk.run('Track', 'playable', {}, (err, res) => {
                console.log("TRACKS fetch", err, res);
                if (res) {
                    const tracks = JSON.parse("" + res);
                    for (let i = 0; i < tracks.length; i++) {
                        this.add(tracks[i].value);
                    }
                }
            });
        }
    }
});

export default Tracks;
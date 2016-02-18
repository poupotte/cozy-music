import Backbone from 'backbone'
import Track from '../models/track'

const Tracks = Backbone.Collection.extend({
    model: Track,
    sync: function (method, model, options) {
        if (method == 'read') {
            console.log('fetch');
            cozysdk.run('File', 'getMusicFiles', {}, (err, res) => {
                //console.log("collection fetch", err, res);
                if (res) {
                    const tracks = JSON.parse("" + res);
                    for (let i = 0; i < tracks.length; i++) {
                        const trackname = tracks[i].key.name
                        this.add({
                            metas : { 
                                title: trackname
                            }
                        });
                    }
                }
            });
        }
    }
});

export default Tracks;
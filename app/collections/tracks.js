import Backbone from 'backbone'
import Track from '../models/track'


cozysdk.run('File', 'getMusicFiles', {}, (error, response) => {
    console.log('FILEMUSIC', error, response);
});


const Tracks = Backbone.Collection.extend({
    model: Track,
    initialize: () => {

    },
    sync: (method, model, options) => {
        if (method == 'read') {
            console.log('fetch');
            cozysdk.run('File', 'getMusicFiles', {}, (error, response) => {
                if (response) {
                    for (const track of tracks) {
                        this.create({
                            metas : { 
                                title: track.name
                            }
                        });
                    }
                }
            });
        }
    }
});

export default Tracks;
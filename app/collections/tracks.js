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
                        this.add(tracks[i].value);
                    }
                }
            });
        }
    },
    fileIDexist: function(fileID) {
        let res = false;
        console.log('YO', fileID);
        console.log('YO', this.models.length);
        for (let i = 0; i < this.models.length; i++) {
            const track = this.at(i);
            console.log('TESTID', track.get('ressource').fileID, fileID);
            if (track.get('ressource').fileID == fileID) {
                res = true;
            }
        }
        return res;
    }
});

export const syncFiles = function () {
    cozysdk.run('File', 'music', {}, (err, res) => {
        console.log("syncFiles", err, res);
        if (res) {
            const files = JSON.parse("" + res);
            getAllTracksFileId(files);
        }
    });
}

function getAllTracksFileId(musicFiles) {
    cozysdk.run('Track', 'all', {}, (err, res) => {
        console.log("getAllTracksFileId", err, res);
        let tracksFileId = [];
        if (res) {
            const tracks = JSON.parse("" + res);
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].value.ressource.fileID) {
                    tracksFileId.push(tracks[i].value.ressource.fileID);
                }
            }
        }
        saveTrack(musicFiles, tracksFileId)
    });
}

function saveTrack(musicFiles, tracksFileId) {
    const files = musicFiles;
    for (let i = 0; i < files.length; i++) {
        const file = files[i].value;
        const trackname = file.name; // TO DO : ID3TAG
        const fileid = file._id;
        const t = new Track({
            metas: { 
                title: trackname
            },
            ressource: {
                fileID: fileid
            }
        });

        if (tracksFileId.indexOf(fileid) <= -1) { // does not contains fileid 
            t.save();
        }
    }   
}


export default Tracks;
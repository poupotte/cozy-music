import Track from '../models/track';
import application from '../application';
import cozysdk from 'cozysdk-client';


export function syncFiles() {
    cozysdk.run('File', 'music', {}, (err, res) => {
        if (res) {
            let files = JSON.parse('' + res);
            getAllTracksFileId(files);
        }
    });
}

// Get all needed variable
function getAllTracksFileId(musicFiles) {
    cozysdk.run('Track', 'file', {}, (err, res) => {
        let tracksFileId = [];
        let allTracksFiles = [];
        let musicFilesFileId = [];
        if (res) {
            let tracks = JSON.parse('' + res);
            for (let i = 0; i < tracks.length; i++) {
                tracksFileId.push(tracks[i].value.ressource.fileID);
                allTracksFiles.push(new Track(tracks[i].value));
            }
            for (let i = 0; i < musicFiles.length; i++) {
                musicFilesFileId.push(musicFiles[i].value._id);
            }
            saveTrack(musicFiles, tracksFileId);
            deleteTrack(allTracksFiles, musicFilesFileId);
            let msg = t('all your audio files have been added');
            application.channel.request('notification', msg);
        }
    });
}

// Delete track if the files associated is deleted too
function deleteTrack(allTracks, musicFilesFileId) {
    for (let i = 0; i < allTracks.length; i++) {
        let t = allTracks[i];
        if (!_.includes(musicFilesFileId, t.get('ressource').fileID)) {
            t.destroy({ success: () => {
                application.allTracks.get('tracks').remove(t);
            }});
        }
    }
}

// Save the track if it's a new file that has not been synced
function saveTrack(musicFiles, tracksFileId) {
    let files = musicFiles;
    for (let i = 0; i < files.length; i++) {
        let file = files[i].value;
        let trackname = file.name; // TO DO : ID3TAG
        let fileid = file._id;
        let t = new Track({
            metas: {
                title: trackname
            },
            ressource: {
                type: 'file',
                fileID: fileid
            }
        });

        if (!_.includes(tracksFileId, fileid)) { // does not contains fileid
            application.allTracks.get('tracks').create(t);
        }
    }
}

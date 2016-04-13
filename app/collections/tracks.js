import Backbone from 'backbone';
import Track from '../models/track';
import cozysdk from 'cozysdk-client';
import application from '../application'

const Tracks = Backbone.Collection.extend({

    model: Track,

    initialize(models, options) {
        this.type = options.type;
        if (this.type == 'upNext') {
            this.listenTo(application, 'start', this.addCurrentToUpNext);
            this.listenTo(
                application.channel,
                'reset:UpNext',
                this.resetUpNext
            );
            this.listenTo(
                application.appState,
                'change:shuffle',
                this.shuffleUpNext
            );
        }
        this.on('change:hidden', this.removeTrack, this);
    },

    // UpNext : shuffle
    shuffleUpNext(appState, shuffle) {
        if (shuffle) {
            this.reset(this.shuffle(), {silent:true});
        }
        this.sort();
    },

    // UpNext : reset
    resetUpNext() {
        application.appState.set('currentTrack', undefined);
        application.upNext.get('tracks').reset();
    },

    // UpNext : add the current track to up next if not alreay in it.
    addCurrentToUpNext() {
        this.listenTo(
            application.appState,
            'change:currentTrack',
            function(appState, currentTrack) {
                if (!this.contains(currentTrack)) {
                    this.push(currentTrack);
                }
            }
        );
    },

    removeTrack(track) {
        this.remove(track);
    },

    comparator(model) {
        if (this.type == 'upNext' && application.appState.get('shuffle')) {
            return undefined;
        } else {
            return model.get('metas').title;
        }
    },

    sync(method, model, options) {
        if (method == 'read' && this.type == "all") {
            cozysdk.run('Track', 'playable', {}, (err, res) => {
                if (res) {
                    if (options && options.success) {
                        options.success(res);
                    }
                } else {
                    if (options && options.error) {
                        options.error(err);
                    }
                }
            });
        }
    },

    parse(tracks, options) {
        let result = [];
        for (let i = 0; i < tracks.length; i++) {
            result.push(tracks[i].value);
        }
        return result;
    }
});

// COZYSDK : Requests \\
cozysdk.defineRequest('File', 'music', (doc) => {
        if (doc.class == 'music') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
});

cozysdk.defineRequest('Track', 'all', (doc) => {
    if (!doc._attachments) {
        emit(doc._id, doc);
    }
    }, (error, response) => {
});

cozysdk.defineRequest('Track', 'oldDoctype', (doc) => {
        if (doc.title) {
            emit(doc._id, doc);
        }
    }, (error, response) => {
});

cozysdk.defineRequest('Track', 'playable', (doc) => {
        if (!doc.hidden && !doc._attachments) {
            emit(doc._id, doc);
        }
    }, (error, response) => {
});

cozysdk.defineRequest('Track', 'file', (doc) => {
        if (doc.ressource.type == 'file') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
});

cozysdk.defineRequest('Track', 'soundcloud', (doc) => {
        if (doc.ressource.type == 'soundcloud') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
});

export default Tracks;

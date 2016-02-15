import Backbone from 'backbone'
import Playlist from '../models/playlist'

const Playlists = Backbone.Collection.extend({
    model: Playlist
});

export default Playlists;
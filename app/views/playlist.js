import Mn from 'backbone.marionette';
import application from '../application';


const PlaylistView = Mn.ItemView.extend({

    template: require('./templates/playlist'),

    tagName: 'li',

    className: 'playlist',

    modelEvents: { change: 'render' }
});

export default PlaylistView;
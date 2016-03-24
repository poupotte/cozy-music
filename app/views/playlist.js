import Mn from 'backbone.marionette';
import application from '../application';


const PlaylistView = Mn.ItemView.extend({

    template: require('./templates/playlist'),

    tagName: 'li',

    className: 'playlist',

    modelEvents: { change: 'render' },

    onRender() {
        this.$el.attr('data-id', this.model.get('_id'));
    }
});

export default PlaylistView;
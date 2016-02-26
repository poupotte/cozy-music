import Mn from 'backbone.marionette';

const TrackView = Mn.ItemView.extend({
    template: require('views/templates/track'),
    serializeData: function() {
        return {
            trackname: this.model.get('metas').title,
            id: this.model.get('_id')
        };
    }
});

export default TrackView;
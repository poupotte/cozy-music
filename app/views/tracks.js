import Mn from 'backbone.marionette';
import Backbone from 'backbone'

const Track = Mn.LayoutView.extend({
    tagName: 'li',
    template: require('views/templates/track')
});


const TrackList = Mn.CollectionView.extend({  
  el: '#app-hook',
  tagName: 'ul',

  childView: Track,

  initialize: function() {
    this.collection = new Backbone.Collection([
      {artist: 'Scott', trackname: 'test'},
      {artist: 'Andrew', trackname: 'Do some coding'}
    ]);
  }
});


export default TrackList;

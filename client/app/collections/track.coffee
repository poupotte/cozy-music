# TrackCollection
# is a collection of tracks (models/track)
# define the endpoint where Backbone will fetch the list of photos

module.exports = class TrackCollection extends Backbone.Collection

    model: require 'models/track'
    url: 'tracks'
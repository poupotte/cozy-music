BaseView = require '../lib/base_view'
TracksView = require 'views/tracks_view'
TrackCollection = require 'collections/track'
Player = require 'views/player/player'

module.exports = class AppView extends BaseView

    el: 'body.application'
    template: require('./templates/home')

    player: null

    afterRender: ->
        # create and render the song track list
        mainView = new TracksView
                            collection: new TrackCollection()

        # soundManager is ready to be called here (cf. application.coffee)
        @player = new Player()
        @player.render()
        @$('#player').append @player.$el


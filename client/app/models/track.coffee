# A song
module.exports = class Track extends Backbone.Model

    defaults: ->
        if @id
            #thumbsrc: "music/#{@id}.mp3"
            src:      "music/#{@id}.mp3"
            state:    'server'
        else
            #thumbsrc: 'images/loading.gif'
            src:      ''
            state:    'loading'
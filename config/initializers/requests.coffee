module.exports = (compound) ->

    Track = compound.models.Track

    all = (doc) ->
        # That means retrieve all docs and order them by title.
        emit doc.title, doc

    Track.defineRequest "all", all, (err) ->
        if err
            compound.logger.write "Track.All requests, cannot be created"
            compound.logger.write err

# By the way we create a fake bookmark to test that our data are well sent.
    Track.create
        title: "track-#{(Math.random()*1000).toFixed(0)}"
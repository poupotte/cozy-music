module.exports = (compound, Bookmark) ->
    Bookmark.all = (params, callback) ->
        # Here we use the Data System API, We retrieve our data through a request
        # defined at application initialization.
        Bookmark.request "all", params, callback
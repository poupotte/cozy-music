exports.routes = (map) ->
    # This line is based on a convention that says
    # that all GET requests sent to "/bookmarks/ should be routed
    # to the action "all" written in the file
    # "app/controllers/bookmarks_controller.coffee"
    map.get 'tracks', 'tracks#all'

BaseView = require '../lib/base_view'

module.exports = class TrackView extends BaseView
    className: 'track'
    tagName: 'div'

    # The template render the bookmark with data given by the model
    template: require './templates/track'

    ###

    # Register event
    events:
        'click .delete-button': 'onDeleteClicked'

    onDeleteClicked: ->
        @$('.delete-button').html "deleting..."
        @model.destroy
          error: ->
                alert "Server error occured, bookmark was not deleted."
                @$('.delete-button').html "delete"
    ###
import Backbone from 'backbone'
import CozySDK from '/vendor/CozySdk'

const Track = Backbone.Model.extend({
	urlRoot: '/track',
    defaults: {
	    track: 'FOO',
	    artist: 'BAR'
	},
	sync: (method, model, options) => {

	}
});


export default Track;
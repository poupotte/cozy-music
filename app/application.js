import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import trackView from 'views/tracks';


class Application extends Mn.Application {

    onStart () {
        console.log('start');
        if (Backbone.history) {
            Backbone.history.start();
        }
        const tracks = new trackView();
        tracks.render();
    }
};

export default new Application();

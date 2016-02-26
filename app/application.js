import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import tracksView from 'views/tracks';


class Application extends Mn.Application {

    onStart () {
        console.log('start');
        if (Backbone.history) {
            Backbone.history.start();
        }
        const tracks = new tracksView();
        tracks.render();
    }
};

export default new Application();

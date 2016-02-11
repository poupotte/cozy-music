import Mn from 'backbone.marionette';
import helloView from './views/hello'

class Application extends Mn.Application {

    initialize() {
        console.log('init');
        foo.
        super.initialize();
    }

    start() {
        if (Backbone.history) {
            Backbone.history.start();
        }
        const hello = new helloView();
        hello.render();
        super.start();
    }

};

export default new Application();

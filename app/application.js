import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import helloView from './views/hello';

class Application extends Mn.Application {

    initialize() {
        console.log('init');
        super.initialize();
    }

    start() {
        console.log('render');
        if (Backbone.history) {
            Backbone.history.start();
        }
        const hello = new helloView();
        hello.render();
        super.start();
    }

};

export default new Application();

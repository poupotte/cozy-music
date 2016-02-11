import Mn from 'backbone.marionette';


class HelloWorld extends Mn.LayoutView {
    super.el = '#app-hook';
    super.template = require('./templates/hello.html');
};

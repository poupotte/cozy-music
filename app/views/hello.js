import Mn from 'backbone.marionette';

const HelloView = Mn.LayoutView.extend({
    el: '#app-hook',
    template: require('views/templates/hello')
});

export default HelloView;

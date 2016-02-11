import Mn from 'backbone.marionette';

const HelloView = Mn.LayoutView.extend({
    el: '#app-hook', 
    template: "<p>Hello, world!</p>"
});

export default HelloView;
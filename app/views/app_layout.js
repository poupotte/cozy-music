import Mn from 'backbone.marionette';
import ContentView from './content';
import PlayerView from './player';
import ToolbarView from './toolbar';

const AppLayout = Mn.LayoutView.extend({

    template: require('./templates/app_layout'),

    el: '[role="application"]',

    regions: {
        toolbar: '[role="toolbar"]',
        content: '[role="contentinfo"]',
        player: '#player-container'
    },

    onRender() {
        this.showChildView('content', new ContentView());
        this.showChildView('player', new PlayerView());
        this.showChildView('toolbar', new ToolbarView());
    }
});

export default AppLayout;

import Mn from 'backbone.marionette';
import ContentView from './content';
import PlayerView from './player';
import ToolbarView from './toolbar';
import application from '../application'


const AppLayout = Mn.LayoutView.extend({

    template: require('./templates/app_layout'),

    el: '[role="application"]',

    regions: {
        toolbar: '[role="toolbar"]',
        content: '[role="contentinfo"]',
        player: '#player-container'
    },

    onRender() {
        this.showChildView('content', new ContentView({
            model: application.appState
        }));
        this.showChildView('player', new PlayerView());
        this.showChildView('toolbar', new ToolbarView());
    }
});

export default AppLayout;

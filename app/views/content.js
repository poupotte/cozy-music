import Mn from 'backbone.marionette';
import HeaderView from './header';
import TracksView from './tracks';
import application from '../application';


const Content = Mn.LayoutView.extend({

    template: require('./templates/content'),

    regions: {
        header: '[role="complementary"]',
        tracks: '#tracks',
    },

    onBeforeShow() {
        let appState = application.appState;
        let currentPlaylist = appState.get('currentPlaylist');
        let header = new HeaderView({ model: appState })
        this.showChildView('header', header);
        this.listenTo(
            appState,
            'change:currentPlaylist',
            this.switchPlaylist
        );
        this.switchPlaylist(appState, currentPlaylist);
    },

    switchPlaylist(appState, currentPlaylist) {
        let collection = currentPlaylist.get('tracks');
        this.showChildView('tracks',
            new TracksView({ collection: collection })
        );
    }
});

export default Content;

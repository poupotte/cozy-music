import Mn from 'backbone.marionette';
import application from '../application';

const Notification = Mn.ItemView.extend({

    template: require('./templates/notification'),

    ui: {
        notification: '.notification',
    },

    initialize(notification) {
        this.message = notification.message;
        this.status = notification.status;
    },

    onRender() {
        this.ui.notification.addClass('notify');
        setTimeout(() => { // Prevent animation to replay after reopening the app
            this.ui.notification.removeClass('notify');
        }, 4000);
    },

    serializeData() {
        return {
            message: this.message,
            status: this.status
        }
    }
});

export default Notification;

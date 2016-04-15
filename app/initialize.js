import application from './application';
import Polyglot from 'node-polyglot';
import cozysdk from 'cozysdk-client';

function init(locale) {
    console.log(locale)
    let phrases;
    try {
        phrases = require("./locales/" + locale);
    } catch (e) {
        phrases = require('./locales/en');
    }
    let polyglot = new Polyglot({phrases: phrases, locale: locale});

    window.t = polyglot.t.bind(polyglot);
    application.start();
}

document.addEventListener('DOMContentLoaded', function () {
    cozysdk.run('cozyinstance', 'all', {}, (err, instances) => {
        let locale = 'en';
        if (instances) {
            locale = instances[0].value.locale;
        }
        init(locale);
    });
});

// prevent the scroll with keyboard
$(document).keydown(function(e) {
    let isScrollKey = [32, 37, 38, 39, 40].indexOf(e.which) > -1;
    if (isScrollKey && e.target == document.body) {
        e.preventDefault();
    }
});

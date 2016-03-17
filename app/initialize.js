import application from './application';
import Polyglot from 'node-polyglot';

function initLocale() {
    let locale = document.documentElement.getAttribute('lang');
    let phrases;
    try {
    	phrases = require("./locales/#{locale}")
    } catch (e) {
        phrases = require('./locales/en')
    }
    let polyglot = new Polyglot({phrases: phrases, locale: locale})

    window.t = polyglot.t.bind(polyglot)
}

document.addEventListener('DOMContentLoaded', function () {
	initLocale();
	application.start();
});

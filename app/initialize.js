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

$(document).keydown(function(e) {
    let isScrollKey = [32, 37, 38, 39, 40].indexOf(e.which) > -1;
    if (isScrollKey && e.target == document.body) {
        e.preventDefault(); // prevent the scroll with keyboard
    }
});

document.addEventListener('DOMContentLoaded', function () {
	initLocale();
	application.start();
});

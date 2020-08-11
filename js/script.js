/* globals axios */
window.addEventListener("DOMContentLoaded", () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        calc = require('./modules/calc'),
        form = require('./modules/forms'),
        slider = require('./modules/slider'),
        cards = require('./modules/cards');
    tabs();
    modal();
    timer();
    calc();
    form();
    slider();
    cards();
});
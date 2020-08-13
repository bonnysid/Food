/* globals axios */
import tabs from './modules/tabs';
import modal, {
    openModal
} from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import form from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';

window.addEventListener("DOMContentLoaded", () => {

    const timerModal = setTimeout(() => openModal('.modal', timerModal), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2020-10-11');
    calc();
    form('form', timerModal);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards();
});
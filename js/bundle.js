/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
    const calcResult = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
        height, weight, age,
        ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            calcResult.textContent = '____';
            return;
        }

        if (sex === 'female') {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', `${e.target.getAttribute('data-ratio')}`);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', `${e.target.getAttribute('id')}`);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', (e) => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            if (input.value.match(/\D/)) e.target.style.border = '1px solid red';
            else e.target.style.border = 'none';
            calcTotal();
        });
    }

    function setInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(elem => {
            if (elem.getAttribute('id') === sex) elem.classList.add(activeClass);
            else if (elem.getAttribute('data-ratio') === ratio) elem.classList.add(activeClass);
            else if (elem.getAttribute('data-ratio')) elem.classList.remove(activeClass);
            else if (elem.getAttribute('id')) elem.classList.remove(activeClass);
        });
    }

    setInformation('#gender', 'calculating__choose-item_active');
    setInformation('.calculating__choose_big', 'calculating__choose-item_active');
    calcTotal();
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
    class Catalog {
        constructor(title, img, alt, description, price, parentSelector, ...classes) {
            this.title = title;
            this.img = img;
            this.alt = alt;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToUAH();
        }

        render() {
            let cardsHTML = document.createElement('div');
            // const menu = document.querySelector('.menu');
            // const subMenu = this.parentSelector.querySelector('.container');

            if (this.classes.length != 0) {
                this.classes.forEach(item => {
                    cardsHTML.classList.add(item);
                });
            } else {
                this.element = 'menu__item';
                cardsHTML.classList.add(this.element);
            }


            cardsHTML.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            // subMenu.insertAdjacentElement('beforeend', cardsHTML);
            this.parentSelector.append(cardsHTML);

        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
    }

    const getResources = async url => { //асихронные процессы
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResources("http://localhost:3000/menu")
    //     .then((data) => {
    //         data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new Catalog(title, img, altimg, descr, price, ".menu .container").render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then((data) => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new Catalog(title, img, altimg, descr, price, ".menu .container").render();
            });
        })

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => { //асихронные процессы
        const res = await fetch(url, { //ждет получаения ответа
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            statusMessage.textContent = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);

            //------------------------------------PHP----------------------------------------------------

            // fetch('server.php', { //куда отправляем
            //         method: 'POST', //каким образом отправляем
            //         body: formData //что имеено отправляем
            //     }).then(data => data.text())
            //     .then(data => {
            //         showThanksModal(message.success);
            //         statusMessage.remove();
            //         form.reset();
            //         console.log(data);
            //     })
            //     .catch(() => {
            //         showThanksModal(message.failure);
            //     })
            //     .finally(() => {
            //         form.reset();
            //     });
            //---------------------------------------JSON------------------------------------------------

            const json = JSON.stringify((Object.fromEntries(formData.entries())));
            console.log(json);
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
            //-------------------------------------------------------------------------------------------

            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         showThanksModal(message.success);
            //         statusMessage.remove();
            //         form.reset();
            //         console.log(request.response);
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <form action="#">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </form>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout((params) => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    const modal = document.querySelector('.modal'),
        modalOpen = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.classList.add('lock');
        clearInterval(timerModal);
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.classList.remove('lock');

    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    modalOpen.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    // modalClose.forEach((item) => {
    //     item.addEventListener('click', toggleModal);
    // });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    let timerModal = setTimeout(openModal, 50000);

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    const slider = document.querySelector('.offer__slider'),
        sliderTotal = slider.querySelector('#total'),
        sliderCounter = slider.querySelector('#current'),
        nextSlide = slider.querySelector('.offer__slider-next'),
        prevSlide = slider.querySelector('.offer__slider-prev'),
        slides = slider.querySelectorAll('.offer__slide'),
        slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function plusCounter(x) {
        slideIndex += x;
        sliderCounter.textContent = getZero(slideIndex);
    }

    function showDot() {
        dots.forEach((dot) => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    }

    function getNums(string) {
        return +string.replace(/\D/g, '');
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    sliderCounter.textContent = "01";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextSlide.addEventListener('click', () => {
        if (offset == getNums(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
            sliderCounter.textContent = "01";
        } else {
            plusCounter(1);
            offset += getNums(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        showDot();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = getNums(width) * (slides.length - 1);
            plusCounter(slides.length - 1);
        } else {
            plusCounter(-1);
            offset -= getNums(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        showDot();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = +slideTo;
            offset = getNums(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            sliderCounter.textContent = getZero(slideIndex);
            showDot();
        });

    });

    // sliderTotal.innerText = getZero(slides.length);

    // function hiddenSlides() {
    //     slides.forEach((slide) => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     });
    // }

    // function showSlide(i = 0) {
    //     slides[i].classList.remove('hide');
    //     slides[i].classList.add('show');
    // }

    // hiddenSlides();
    // showSlide();

    // nextSlide.addEventListener('click', (event) => {
    //     if (+sliderCounter.innerText < slides.length) {
    //         sliderCounter.innerText = getZero(+sliderCounter.innerText + 1);
    //     } else {
    //         sliderCounter.innerText = `0${1}`;
    //     }
    //     hiddenSlides();
    //     showSlide(+sliderCounter.innerText - 1);
    // });

    // prevSlide.addEventListener('click', (event) => {
    //     if (+sliderCounter.innerText > 1) {
    //         sliderCounter.innerText = getZero(+sliderCounter.innerText - 1);
    //     } else {
    //         sliderCounter.innerText = getZero(slides.length);
    //     }
    //     hiddenSlides();
    //     showSlide(+sliderCounter.innerText - 1);
    // });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function tabsHideContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    tabsHideContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target);
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    tabsHideContent();
                    showTabContent(i);
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {

    const deadLine = '2020-06-26';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadLine);
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals axios */
window.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        form = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    tabs();
    modal();
    timer();
    calc();
    form();
    slider();
    cards();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
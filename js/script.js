/* globals axios */
window.addEventListener("DOMContentLoaded", () => {

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

    // Timer

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

    // Modal

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

    // Cards

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

    //Forms

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

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                    console.log(data);
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

    //Slider 

    const slider = document.querySelector('.offer__slider'),
        sliderTotal = slider.querySelector('#total'),
        sliderCounter = slider.querySelector('#current'),
        nextSlide = slider.querySelector('.offer__slider-next'),
        prevSlide = slider.querySelector('.offer__slider-prev'),
        slides = slider.querySelectorAll('.offer__slide');

    sliderTotal.innerText = getZero(slides.length);

    function hiddenSlides() {
        slides.forEach((slide) => {
            slide.classList.add('hide');
            slide.classList.remove('show');
        });
    }

    function showSlide(i = 0) {
        slides[i].classList.remove('hide');
        slides[i].classList.add('show');
    }

    hiddenSlides();
    showSlide();

    nextSlide.addEventListener('click', (event) => {
        if (+sliderCounter.innerText < slides.length) {
            sliderCounter.innerText = getZero(+sliderCounter.innerText + 1);
        } else {
            sliderCounter.innerText = `0${1}`;
        }
        hiddenSlides();
        showSlide(+sliderCounter.innerText - 1);
    });

    prevSlide.addEventListener('click', (event) => {
        if (+sliderCounter.innerText > 1) {
            sliderCounter.innerText = getZero(+sliderCounter.innerText - 1);
        } else {
            sliderCounter.innerText = getZero(slides.length);
        }
        hiddenSlides();
        showSlide(+sliderCounter.innerText - 1);
    });


});
function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    const slider = document.querySelector(container),
        sliderTotal = slider.querySelector(totalCounter),
        sliderCounter = slider.querySelector(currentCounter),
        nextSlide = slider.querySelector(nextArrow),
        prevSlide = slider.querySelector(prevArrow),
        slides = slider.querySelectorAll(slide),
        slidesWrapper = slider.querySelector(wrapper),
        slidesField = slidesWrapper.querySelector(field),
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

export default slider;
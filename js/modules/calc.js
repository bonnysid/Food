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

export default calc;
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
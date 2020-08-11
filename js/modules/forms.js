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
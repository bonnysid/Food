function openModal(modalSelector, timerModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.classList.add('lock');

    if (timerModal) {
        clearInterval(timerModal);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.classList.remove('lock');
}

function modal(triggerSelector, modalSelector, timerModal) {
    const modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(triggerSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, timerModal);
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    modalOpen.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, timerModal));
    });

    // modalClose.forEach((item) => {
    //     item.addEventListener('click', toggleModal);
    // });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);
}

export {
    openModal,
    closeModal
};
export default modal;
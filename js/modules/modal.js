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
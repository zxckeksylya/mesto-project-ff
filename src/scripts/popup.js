function Popup(popup) {
    const popupClose = popup.querySelector('.popup__close');

    const popupOpen = () => {
        popup.classList.add('popup_is-opened');
        popupClose.addEventListener('click', closeFunc);
        popup.addEventListener('click', closeByWrapper);
        document.addEventListener('keydown', closeByEsc);
    };

    const closeByEsc = evt => {
        if (evt.keyCode === 27) {
            closeFunc();
        }
    };

    const closeByWrapper = evt => {
        const currentTarget = evt.currentTarget;
        const target = evt.target;
        if (currentTarget == target) {
            closeFunc();
        }
    };

    const closeFunc = () => {
        popup.classList.remove('popup_is-opened');
        popupClose.removeEventListener('click', closeFunc);
        popup.removeEventListener('click', closeByWrapper);
        document.removeEventListener('keydown', closeByEsc);
    };

    return {
        open: popupOpen,
        close: closeFunc,
    };
}

export default Popup;

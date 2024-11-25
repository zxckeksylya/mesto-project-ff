function Popup(popup, closeCallback = () => {}) {
  const popupClose = popup.querySelector(".popup__close");
  popup.classList.add("popup_is-animated");

  const popupOpen = () => {
    popup.classList.add("popup_is-opened");
    popupClose.addEventListener("click", close);
    popup.addEventListener("click", closeByWrapper);
    document.addEventListener("keydown", closeByEsc);
  };

  const closeByEsc = (evt) => {
    if (evt.keyCode === 27) {
      close();
    }
  };

  const closeByWrapper = (evt) => {
    const currentTarget = evt.currentTarget;
    const target = evt.target;
    if (currentTarget == target) {
      close();
    }
  };

  const close = () => {
    closeCallback();
    popup.classList.remove("popup_is-opened");
    popupClose.removeEventListener("click", close);
    popup.removeEventListener("click", closeByWrapper);
    document.removeEventListener("keydown", closeByEsc);
  };

  return {
    open: popupOpen,
    close: close,
  };
}

export default Popup;

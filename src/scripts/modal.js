function createModal(modal, closeCallback = () => {}) {
  const popupClose = modal.querySelector(".popup__close");
  modal.classList.add("popup_is-animated");

  const open = () => {
    modal.classList.add("popup_is-opened");
    popupClose.addEventListener("click", close);
    modal.addEventListener("click", closeByWrapper);
    document.addEventListener("keydown", closeByEsc);
  };

  const closeByEsc = (evt) => {
    if (evt.keyCode === "Escape") {
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
    modal.classList.remove("popup_is-opened");
    popupClose.removeEventListener("click", close);
    modal.removeEventListener("click", closeByWrapper);
    document.removeEventListener("keydown", closeByEsc);
  };

  return {
    open,
    close,
  };
}

export default createModal;

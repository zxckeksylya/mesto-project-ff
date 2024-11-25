import card from "./card";

function Modal(modal, closeCallback = () => {}) {
  const popupClose = modal.querySelector(".popup__close");
  modal.classList.add("popup_is-animated");

  const open = () => {
    modal.classList.add("popup_is-opened");
    popupClose.addEventListener("click", close);
    modal.addEventListener("click", closeByWrapper);
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

const popupTypeImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".popup__image");

function imageModal(obj) {
  const modal = Modal(popupTypeImage);

  const open = () => {
    cardImage.alt = obj.name;
    cardImage.src = obj.link;
    modal.open();
  };

  const close = () => {
    modal.close();
  };

  return {
    open,
    close,
  };
}

function Control(control, validateRules) {
  const getValue = () => {
    return control.value;
  };

  const setValue = (value) => {
    control.value = value;
  };

  const validate = () => {
    return validateRules.reduce((prev, curr) => {
      if (prev == false) {
        return false;
      }

      return curr(control.value);
    }, true);
  };

  return {
    getValue,
    setValue,
    validate,
  };
}

const required = (value) => {
  if (value !== "") {
    return true;
  }
  return false;
};

function Form(form, formControls, submitCallback) {
  const validate = () => {
    const status = Object.values(formControls).reduce((prev, curr) => {
      if (prev === false) {
        return false;
      }
      return curr.validate();
    }, true);
  };

  const submit = (evt) => {
    evt.preventDefault();
    if (validate) {
      submitCallback();
      reset();
    } else {
      console.log("не прошла валидация");
    }
  };

  const reset = () => {
    form.reset();
  };

  return {
    submit,
    reset,
  };
}

const popupTypeEdit = document.querySelector(".popup_type_edit");

function editFormModal(editFormElement) {
  const modalProfile = Modal(popupTypeEdit, closeCalback);
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  const controls = {
    name: Control(editFormElement.elements["name"], [required]),
    description: Control(editFormElement.elements["description"], [required]),
  };

  const form = Form(editFormElement, controls, () => {
    title.textContent = controls.name.getValue();
    description.textContent = controls.description.getValue();
    modalProfile.close();
  });

  const closeCalback = () => {
    form.reset();
    editFormElement.removeEventListener("submit", form.submit);
    editFormElement.removeEventListener("reset", form.reset);
  };
  const open = () => {
    controls.name.setValue(title.textContent);
    controls.description.setValue(description.textContent);
    editFormElement.addEventListener("submit", form.submit);
    editFormElement.addEventListener("reset", form.reset);
    modalProfile.open();
  };

  const close = () => {
    modalProfile.close(() => {});
  };

  return {
    open,
    close,
  };
}

const cardsContainer = document.querySelector(".places__list");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

function cardFormModal(cardFormElement) {
  const controls = {
    "place-name": Control(cardFormElement.elements["place-name"], [required]),
    link: Control(cardFormElement.elements["link"], [required]),
  };

  const form = Form(cardFormElement, controls, () => {
    const cardObj = {
      name: controls["place-name"].getValue(),
      link: controls.link.getValue(),
    };
    const newCard = card.Card(cardObj, card.removeCard);

    cardsContainer.prepend(newCard.getElement());
  });

  const modal = Modal(popupTypeNewCard, closeCalback);

  const closeCalback = () => {
    form.reset();
    cardFormElement.removeEventListener("submit", form.submit);
    cardFormElement.removeEventListener("reset", form.reset);
  };

  const open = () => {
    modal.open();
    cardFormElement.addEventListener("submit", form.submit);
    cardFormElement.addEventListener("reset", form.reset);
  };

  const close = () => {
    modal.close();
  };

  return {
    open,
    close,
  };
}

export default {
  cardFormModal,
  editFormModal,
  imageModal,
};

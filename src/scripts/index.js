import "../pages/index.css";
import card from "./card";
import ininitialCards from "./cards";
import createModal from "./modal";

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const cardTemplate = document.querySelector("#card-template").content;

const editFormElement = document.forms["edit-profile"];
const cardFormElement = document.forms["new-place"];

const popupTypeImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".popup__image");
const cardCaption = document.querySelector(".popup__caption");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const title = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

function createImageModal(obj) {
  const modal = createModal(popupTypeImage);

  const open = () => {
    cardImage.alt = obj.name;
    cardImage.src = obj.link;
    cardCaption.textContent = obj.name;
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

function Form({ form, controls, submitCallback = () => {} }) {
  const validate = () => {
    const status = Object.values(controls).reduce((prev, curr) => {
      if (prev === false) {
        return false;
      }
      return curr.validate();
    }, true);

    return status;
  };

  const submit = (evt) => {
    evt.preventDefault();
    if (validate) {
      submitCallback();
      reset();
    } else {
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

function editFormModal({ editFormElement, editObj: { title, description } }) {
  const modalProfile = createModal(popupTypeEdit, closeCalback);

  const controls = {
    name: Control(editFormElement.elements["name"], [required]),
    description: Control(editFormElement.elements["description"], [required]),
  };

  const submitCallback = () => {
    title.textContent = controls.name.getValue();
    description.textContent = controls.description.getValue();
    modalProfile.close();
  };

  const form = Form({
    form: editFormElement,
    controls,
    submitCallback,
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

function cardFormModal(cardFormElement) {
  const controls = {
    "place-name": Control(cardFormElement.elements["place-name"], [required]),
    link: Control(cardFormElement.elements["link"], [required]),
  };

  const submitCallback = () => {
    const cardObj = {
      name: controls["place-name"].getValue(),
      link: controls.link.getValue(),
    };
    const newCard = card.createCard({
      card: cardObj,
      calbacks: {
        removeCalback: card.removeCard,
        cardTemplate,
        openModalImageCallBack: createImageModal(cardObj).open,
      },
    });

    cardsContainer.prepend(newCard.getElement());
    modal.close();
  };

  const form = Form({ form: cardFormElement, controls, submitCallback });

  const modal = createModal(popupTypeNewCard, closeCalback);

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

function generatePage() {
  ininitialCards.forEach((item) => {
    const calbacks = {
      removeCalback: card.removeCard,
      cardTemplate,
      openModalImageCallBack: createImageModal(item).open,
    };

    const newCard = card.createCard({
      card: item,
      calbacks,
    });
    cardsContainer.append(newCard.getElement());
  });
}

const editForm = editFormModal({
  editFormElement,
  editObj: { title, description },
});
const cardForm = cardFormModal(cardFormElement);

profileEditButton.addEventListener("click", editForm.open);
profileAddButton.addEventListener("click", cardForm.open);

generatePage();

import "../pages/index.css";
import { api } from "./api";
import card from "./card";
import createModal from "./modal";
import {
  Control,
  Form,
  required,
  maxLengthValidate,
  minLengthValidate,
  patternValidate,
} from "./validate";

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditAvatarButton = document.querySelector(
  ".profile__edit-avatar-button"
);

const cardTemplate = document.querySelector("#card-template").content;

const editFormElement = document.forms["edit-profile"];
const cardFormElement = document.forms["new-place"];
const cardFormDelete = document.forms["delete-confirm"];

const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarEditFormElement = document.forms["edit-avatar"];

const popupTypeImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".popup__image");
const cardCaption = document.querySelector(".popup__caption");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeDeleteCard = document.querySelector(
  ".popup_type_delete-confirm"
);

const title = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

const avatarImg = document.querySelector(".profile__image");

const userAvatar = document.querySelector(".profile__image");

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

function editFormModal({ editFormElement, editObj: { title, description } }) {
  const modalProfile = createModal(popupTypeEdit, closeCalback);

  const nameErrorTemplate = editFormElement.querySelector(
    ".popup__input_type_name-error"
  );
  const descriptionErrorTemplate = editFormElement.querySelector(
    ".popup__input_type_description-error"
  );
  const controls = {
    name: Control(
      editFormElement.elements["name"],
      [
        [required, "Поле должно быть заполнено"],
        [minLengthValidate(2), "Поле должно быть более 2 символов"],
        [maxLengthValidate(40), "Поле должно быть менее 40 символов"],
        [
          patternValidate(/^[A-Za-zА-Яа-яЁё\s\-]+$/),
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        ],
      ],
      nameErrorTemplate
    ),
    description: Control(
      editFormElement.elements["description"],
      [
        [required, "Поле должно быть заполнено"],
        [minLengthValidate(2), "Поле должно быть более 2 символов"],
        [maxLengthValidate(200), "Поле должно быть менее 200 символов"],
        [
          patternValidate(/^[A-Za-zА-Яа-яЁё\s\-]+$/),
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        ],
      ],
      descriptionErrorTemplate
    ),
  };

  const submitCallback = async () => {
    const body = {
      name: controls.name.getValue(),
      about: controls.description.getValue(),
    };

    try {
      const answer = await api.userService.updateUserInfo({ body });
      title.textContent = answer.name;
      description.textContent = answer.about;
    } catch (error) {
      console.log(error);
    }

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

function cardFormModal(cardFormElement, userId) {
  const cardNameErrorTemplate = cardFormElement.querySelector(
    ".popup__input_type_card-name-error"
  );
  const urlErrorTemplates = cardFormElement.querySelector(
    ".popup__input_type_url-error"
  );
  const controls = {
    "place-name": Control(
      cardFormElement.elements["place-name"],
      [
        [required, "Поле должно быть заполнено"],
        [minLengthValidate(2), "Поле должно быть более 2 символов"],
        [maxLengthValidate(30), "Поле должно быть менее 30 символов"],
        [
          patternValidate(/^[A-Za-zА-Яа-яЁё\s\-]+$/),
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        ],
      ],
      cardNameErrorTemplate
    ),
    link: Control(
      cardFormElement.elements["link"],
      [
        [required, "Поле должно быть заполнено"],
        [
          patternValidate(/^(ftp|http|https):\/\/[^ "]+$/),
          "Должна отображаться ссылка",
        ],
      ],
      urlErrorTemplates
    ),
  };

  const submitCallback = async () => {
    const cardObj = {
      name: controls["place-name"].getValue(),
      link: controls.link.getValue(),
    };

    try {
      const answer = await api.cardsService.addNewCard({ body: cardObj });
      const calbacks = {
        cardTemplate,
        openModalImageCallBack: createImageModal(answer).open,
        openModalDeleteCallBack: createDeleteCardModal(
          cardFormDelete,
          answer._id
        ).open,
        likeHandler: likeHandler(userId),
      };

      const newCard = card.createCard({
        card: answer,
        calbacks,
        userId: userId,
      });
      cardsContainer.prepend(newCard.getElement());
    } catch (error) {
      console.log(error);
    }

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

function likeHandler(userId) {
  return (likes, cardId, likeButton, likeCount) => {
    return async () => {
      const index = likes.findIndex((item) => item._id === userId);

      if (index !== -1) {
        try {
          const newCard = await api.cardsService.unlikeCard({ cardId });
          likes = newCard.likes;
          likeButton.classList.remove("card__like-button_is-active");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const newCard = await api.cardsService.likeCard({ cardId });
          likes = newCard.likes;
          likeButton.classList.add("card__like-button_is-active");
        } catch (error) {
          console.log(error);
        }
      }

      likeCount.textContent = likes.length;
    };
  };
}

function createDeleteCardModal(cardFormElement, cardId) {
  const modal = createModal(popupTypeDeleteCard, closeCalback);
  const controls = {};

  const submitCallback = async () => {
    try {
      const answer = await api.cardsService.deleteCard({ cardId });
      const card = cardsContainer.querySelector('[data-id="' + cardId + '"]');
      card.remove();
    } catch (error) {
      console.log(error);
    }
    modal.close();
  };

  const form = Form({ form: cardFormElement, controls, submitCallback });

  const closeCalback = () => {
    form.reset();
    cardFormElement.removeEventListener("submit", form.submit);
    cardFormElement.removeEventListener("reset", form.reset);
  };

  const open = () => {
    cardFormElement.addEventListener("submit", form.submit);
    cardFormElement.addEventListener("reset", form.reset);
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

function createAvatarEditModal({ editFormElement, editObj: { avatrImg } }) {
  const modalAvatar = createModal(popupTypeEditAvatar, closeCalback);

  const linkErrorTemplate = editFormElement.querySelector(
    ".popup__input_type_url-error"
  );

  const controls = {
    link: Control(
      editFormElement.elements["link"],
      [
        [required, "Поле должно быть заполнено"],
        [
          patternValidate(/^(ftp|http|https):\/\/[^ "]+$/),
          "Должна отображаться ссылка",
        ],
      ],
      linkErrorTemplate
    ),
  };

  const submitCallback = async () => {
    const body = {
      avatar: controls.link.getValue(),
    };

    try {
      const answer = await api.userService.updateUserAvatar({ body });
      avatrImg.src = answer.avatar;
    } catch (error) {
      console.log(error);
    }

    modalAvatar.close();
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
    controls.link.setValue(avatrImg.src);
    editFormElement.addEventListener("submit", form.submit);
    editFormElement.addEventListener("reset", form.reset);

    modalAvatar.open();
  };

  const close = () => {
    modalAvatar.close(() => {});
  };

  return {
    open,
    close,
  };
}

const setUserInfo = ({ name, about }) => {
  title.textContent = name;
  description.textContent = about;
};

const setUserAvatar = ({ avatar, name }) => {
  userAvatar.src = avatar;
  userAvatar.alt = `Аватар ${name}`;
};

async function generatePage() {
  const cards = await api.cardsService.getInitialCards();
  const user = await api.userService.getUserProfile();
  setUserInfo(user);
  setUserAvatar(user);
  cards.forEach((item) => {
    const calbacks = {
      cardTemplate,
      openModalImageCallBack: createImageModal(item).open,
      openModalDeleteCallBack: createDeleteCardModal(cardFormDelete, item._id)
        .open,
      likeHandler: likeHandler(user._id),
    };

    const newCard = card.createCard({
      card: item,
      calbacks,
      userId: user._id,
    });
    cardsContainer.append(newCard.getElement());
  });

  const editForm = editFormModal({
    editFormElement,
    editObj: { title, description },
  });

  const avatarForm = createAvatarEditModal({
    editFormElement: avatarEditFormElement,
    editObj: {
      avatrImg: avatarImg,
    },
  });
  const cardForm = cardFormModal(cardFormElement, user._id);

  profileEditButton.addEventListener("click", editForm.open);
  profileAddButton.addEventListener("click", cardForm.open);
  profileEditAvatarButton.addEventListener("click", avatarForm.open);
}

await generatePage();

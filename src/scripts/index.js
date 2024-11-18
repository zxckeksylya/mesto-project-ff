import initialCards from "./cards";
import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

function editForm() {}

function popupWrapper(popup) {
  return function openPopup(evt) {
    console.log(evt);
    popup.classList.add("popup_is-opened");
    const popupClose = popup.querySelector(".popup__close");

    const closeByEsc = (evt) => {
      if (evt.keyCode === 27) {
        closeFunc(evt);
      }
    };

    const closeByWrapper = (evt) => {
      const currentTarget = evt.currentTarget;
      const target = evt.target;
      if (currentTarget === target) {
        closeFunc(evt);
      }
    };

    const closeFunc = function (evt) {
      console.log(evt);
      popup.classList.remove("popup_is-opened");
      popupClose.removeEventListener("click", closeFunc);
      popup.removeEventListener("click", closeByWrapper);
      document.removeEventListener("keydown", closeByEsc);
    };

    popupClose.addEventListener("click", closeFunc);

    popup.addEventListener("click", closeByWrapper);
    document.addEventListener("keydown", closeByEsc);
  };
}

const openPopupTypeEdit = popupWrapper(popupTypeEdit);
const openPopupTypeNewCard = popupWrapper(popupTypeNewCard);
const openPopupTypeImage = popupWrapper(popupTypeImage);

profileEditButton.addEventListener("click", openPopupTypeEdit);
profileAddButton.addEventListener("click", openPopupTypeNewCard);

function addCard(card, removeCalback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", card.link);
  cardElement.querySelector(".card__image").setAttribute("alt", card.name);

  cardElement.querySelector(".card__title").textContent = card.name;

  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.addEventListener("click", openPopupTypeImage);

  likeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCalback);
  return cardElement;
}

function removeCard(event) {
  const cardItem = event.target.closest(".card");
  cardItem.remove();
}

function generatePage() {
  initialCards.forEach((item) => {
    cardsContainer.append(addCard(item, removeCard));
  });
}

generatePage();

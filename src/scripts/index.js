import initialCards from "./cards";
import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

function closePopup(evt) {
  popupTypeNewCard.classList.remove("popup_is-opened");
  popupTypeNewCard.removeEventListener("click", openPopup);
  console.log("mem2");
}

function openPopup(evt) {
  console.log("mem");
  popupTypeNewCard.classList.add("popup_is-opened");

  const popupClose = popupTypeNewCard.querySelector(".popup__close");
  popupClose.addEventListener("click", closePopup);
}

profileAddButton.addEventListener("click", openPopup);

function addCard(card, removeCalback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", card.link);
  cardElement.querySelector(".card__image").setAttribute("alt", card.name);

  cardElement.querySelector(".card__title").textContent = card.name;

  const likeButton = cardElement.querySelector(".card__like-button");
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

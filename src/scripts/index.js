import "../pages/index.css";
import Card, { removeCard } from "./card";
import cardFormPopup from "./cardFormPopup";
import initialCards from "./cards";
import editFormPopup from "./editFormPopup";

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editFormElement = document.forms["edit-profile"];
const cardFormElement = document.forms["new-place"];

const editForm = editFormPopup(editFormElement);
const cardForm = cardFormPopup(cardFormElement);

profileEditButton.addEventListener("click", editForm.open);
profileAddButton.addEventListener("click", cardForm.open);

function generatePage() {
  initialCards.forEach((item) => {
    cardsContainer.append(Card(item, removeCard).getElement());
  });
}

generatePage();

import "../pages/index.css";
import card from "./card";
import modal from "./modal";
import ininitialCards from "./cards";

const cardsContainer = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editFormElement = document.forms["edit-profile"];
const cardFormElement = document.forms["new-place"];

const editForm = modal.editFormModal(editFormElement);
const cardForm = modal.cardFormModal(cardFormElement);

profileEditButton.addEventListener("click", editForm.open);
profileAddButton.addEventListener("click", cardForm.open);

function generatePage() {
  ininitialCards.forEach((item) => {
    cardsContainer.append(card.Card(item, card.removeCard).getElement());
  });
}

generatePage();

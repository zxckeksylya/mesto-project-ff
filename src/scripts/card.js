import modal from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function Card(card, removeCalback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);

  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  const popup = modal.imageModal(card);
  cardImage.addEventListener("click", popup.open);

  const like = function (event) {
    event.target.classList.toggle("card__like-button_is-active");
  };

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const removeCard = (event) => {
    deleteButton.removeEventListener("click", removeCard);
    likeButton.removeEventListener("click", like);
    removeCalback(event);
  };

  deleteButton.addEventListener("click", removeCard);

  const getElement = () => {
    return cardElement;
  };

  return {
    getElement,
    removeCard,
    like,
  };
}

export const removeCard = (event) => {
  const cardItem = event.target.closest(".card");
  cardItem.remove();
};
export default {
  removeCard,
  Card,
};

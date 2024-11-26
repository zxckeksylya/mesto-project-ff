function createCard({
  card,
  calbacks: {
    removeCalback = () => {},
    cardTemplate,
    openModalImageCallBack = () => {},
  },
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const like = (event) => {
    event.target.classList.toggle("card__like-button_is-active");
  };

  const removeCard = (event) => {
    deleteButton.removeEventListener("click", removeCard);
    likeButton.removeEventListener("click", like);
    cardImage.removeEventListener("click", openModalImageCallBack);
    removeCalback(event);
  };

  cardImage.addEventListener("click", openModalImageCallBack);
  deleteButton.addEventListener("click", removeCard);
  likeButton.addEventListener("click", like);

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
  createCard,
  removeCard,
};

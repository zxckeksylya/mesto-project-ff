function createCard({
  card,
  calbacks: {
    cardTemplate,
    openModalImageCallBack = () => {},
    openModalDeleteCallBack = () => {},
    likeHandler = (likes, cardId, likeButton, likeCount) => {
      return async () => {};
    },
  },
  userId,
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.dataset.id = card._id;
  cardElement.dataset.name = card.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = card.likes.length;
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const like = likeHandler(card.likes, card._id, likeButton, likeCounter);

  if (card.likes.findIndex((item) => item._id === userId) !== -1) {
    likeButton.classList.add("card__like-button_is-active");
  }

  let removeCard = (event) => {};
  if (card.owner._id !== userId) {
    deleteButton.remove();
  } else {
    removeCard = (event) => {
      deleteButton.removeEventListener("click", openModalDeleteCallBack);
      likeButton.removeEventListener("click", like);
      cardImage.removeEventListener("click", openModalImageCallBack);
    };
    deleteButton.addEventListener("click", openModalDeleteCallBack);
  }

  cardImage.addEventListener("click", openModalImageCallBack);
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

export default {
  createCard,
};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
function removeCard(event) {
  const cardItem = event.target.closest(".card");
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
function generatePage() {
  initialCards.forEach((item) => {
    cardsContainer.append(addCard(item, removeCard));
  });
}

generatePage();

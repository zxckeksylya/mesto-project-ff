import initialCards from './cards';
import '../pages/index.css';
import Popup from './popup';
import Form from './form';
import { required } from './validators';
import Control from './control';

const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

console.log(document.forms);
const editFormElement = document.forms['edit-profile'];
const cardFormElement = document.forms['new-place'];

const popupProfile = Popup(popupTypeEdit);
const popupNewCard = Popup(popupTypeNewCard);
const popupImage = Popup(popupTypeImage);

editFormControls = {
    name: Control(editFormElement.elements['name'], [required]),
    description: Control(editFormElement.elements['description'], [required]),
};

const editForm = Form(editFormElement, editFormControls, form => {
    console.log(form);
    popupProfile.close();
});
const cardForm = Form(cardFormElement, { 'place-name': [required], link: [required] }, form => {
    console.log(form);
    popupNewCard.close();
});

profileEditButton.addEventListener('click', popupProfile.open);
profileAddButton.addEventListener('click', popupNewCard.open);

function addCard(card, removeCalback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', card.link);
    cardElement.querySelector('.card__image').setAttribute('alt', card.name);

    cardElement.querySelector('.card__title').textContent = card.name;

    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.addEventListener('click', popupImage.open);

    likeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_is-active');
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCalback);
    return cardElement;
}

function removeCard(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
}

function generatePage() {
    initialCards.forEach(item => {
        cardsContainer.append(addCard(item, removeCard));
    });
}

generatePage();

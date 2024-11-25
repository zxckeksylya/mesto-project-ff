import Card, { removeCard } from "./card";
import Control from "./control";
import Form from "./form";
import Popup from "./popup";
import { required } from "./validators";

const cardsContainer = document.querySelector(".places__list");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

function cardFormPopup(cardFormElement) {
  const popupNewCard = Popup(popupTypeNewCard, closeCalback);

  const controls = {
    "place-name": Control(cardFormElement.elements["place-name"], [required]),
    link: Control(cardFormElement.elements["link"], [required]),
  };

  const form = Form(cardFormElement, controls, () => {
    const cardObj = {
      name: controls["place-name"].getValue(),
      link: controls.link.getValue(),
    };
    const card = Card(cardObj, removeCard);

    cardsContainer.prepend(card.getElement());
  });

  const closeCalback = () => {
    form.reset();
  };

  const open = () => {
    popupNewCard.open();
  };

  const close = () => {
    popupNewCard.close(closeCalback);
  };

  return {
    open,
    close,
  };
}

export default cardFormPopup;

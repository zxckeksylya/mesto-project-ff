import Popup from "./popup";

const popupTypeImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".popup__image");

function imagePopup(obj) {
  const popup = Popup(popupTypeImage);

  const open = () => {
    cardImage.alt = obj.name;
    cardImage.src = obj.link;
    popup.open();
  };

  const close = () => {
    popup.close();
  };

  return {
    open,
    close,
  };
}

export default imagePopup;

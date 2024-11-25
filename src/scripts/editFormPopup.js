import Control from "./control";
import Form from "./form";
import Popup from "./popup";
import { required } from "./validators";

const popupTypeEdit = document.querySelector(".popup_type_edit");

function editFormPopup(editFormElement) {
  const closeCalback = () => form.reset();
  const popupProfile = Popup(popupTypeEdit, closeCalback);
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  const controls = {
    name: Control(editFormElement.elements["name"], [required]),
    description: Control(editFormElement.elements["description"], [required]),
  };

  const form = Form(editFormElement, controls, () => {
    title.textContent = controls.name.getValue();
    description.textContent = controls.description.getValue();
    popupProfile.close();
  });

  const open = () => {
    controls.name.setValue(title.textContent);
    controls.description.setValue(description.textContent);
    popupProfile.open();
  };

  const close = () => {
    popupProfile.close();
  };

  return {
    open,
    close,
  };
}

export default editFormPopup;

import Control from './control';

function editFormPopup(popup, editFormElement) {
    const editFormControls = {
        name: Control(editFormElement.elements['name'], [required]),
        description: Control(editFormElement.elements['description'], [required]),
    };
    const open = () => {
        editFormControls.name.setValue();
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

export default editFormPopup;

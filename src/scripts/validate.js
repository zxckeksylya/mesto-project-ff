export function Control(control, validateRules, errorTemplate) {
  let observers = [];

  const getValue = () => {
    return control.value;
  };

  const setValue = (value) => {
    control.value = value;
  };

  const subscribe = (fn) => {
    observers.push(fn);
  };

  const unsubscribe = (fn) => {
    observers = observers.filter((sub) => sub != fn);
  };

  const broadcast = (data) => {
    observers.forEach((sub) => sub(data));
  };

  const validate = () => {
    const validateObj = isValid();
    if (!validateObj.isValid) {
      showError(validateObj.errorMessage);
    } else {
      hideError();
    }
    broadcast(isValid());
    return isValid;
  };

  const isValid = () => {
    return validateRules.reduce(
      (prev, curr) => {
        if (!prev.isValid) {
          return prev;
        }
        if (!curr[0](control.value)) {
          return {
            isValid: false,
            errorMessage: curr[1],
          };
        }
        return prev;
      },
      { isValid: true, errorMessage: "" }
    );
  };

  control.addEventListener("input", validate);

  const showError = (errorMessage) => {
    errorTemplate.textContent = errorMessage;
    errorTemplate.classList.add("popup__input-error-template_active");
    control.classList.add("popup__input-error_active");
  };

  const hideError = () => {
    errorTemplate.classList.remove("popup__input-error-template_active");
    control.classList.remove("popup__input-error_active");
    errorTemplate.textContent = "";
  };

  hideError();

  return {
    getValue,
    setValue,
    validate,
    subscribe,
    unsubscribe,
    isValid,
  };
}

export const required = (value) => {
  if (value !== "") {
    return true;
  }
  return false;
};

export const minLengthValidate = (num) => {
  return (value) => {
    if (value.length > num) {
      return true;
    }
    return false;
  };
};

export const maxLengthValidate = (num) => {
  return (value) => {
    if (value.length < num) {
      return true;
    }
    return false;
  };
};

export const patternValidate = (pattern) => {
  return (value) => {
    return pattern.test(value);
  };
};

export function Form({ form, controls, submitCallback = () => {} }) {
  const button = form.elements.button;

  const controlsState = Object.values(controls).forEach((item) =>
    item.subscribe((data) => {
      button.disabled = !validate();
    })
  );

  const validate = () => {
    const status = Object.values(controls).reduce((prev, curr) => {
      if (prev === false) {
        return false;
      }
      return curr.isValid().isValid;
    }, true);

    return status;
  };

  const submit = async (evt) => {
    evt.preventDefault();
    if (validate) {
      const textMemo = button.textContent;
      button.textContent = "Cохранение ...";
      await submitCallback();
      button.textContent = textMemo;
      reset();
    } else {
    }
  };

  const reset = () => {
    form.reset();
  };

  return {
    submit,
    reset,
  };
}

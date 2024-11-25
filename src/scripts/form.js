function Form(form, formControls, submitCallback) {
  const validate = () => {
    const status = Object.values(formControls).reduce((prev, curr) => {
      if (prev === false) {
        return false;
      }
      return curr.validate();
    }, true);
  };

  const submit = (evt) => {
    evt.preventDefault();
    if (validate) {
      submitCallback();
      reset();
    } else {
      console.log("не прошла валидация");
    }
  };

  const reset = () => {
    form.reset();
  };

  form.addEventListener("submit", submit);
  form.addEventListener("reset", reset);

  return {
    submit,
    reset,
  };
}

export default Form;

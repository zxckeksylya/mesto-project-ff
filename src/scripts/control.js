function Control(control, validateRules) {
  const getValue = () => {
    return control.value;
  };

  const setValue = (value) => {
    control.value = value;
  };

  const validate = () => {
    return validateRules.reduce((prev, curr) => {
      if (prev == false) {
        return false;
      }

      return curr(control.value);
    }, true);
  };

  return {
    getValue,
    setValue,
    validate,
  };
}

export default Control;

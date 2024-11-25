function Form(form, formControls, submitCallback) {
    const validate = () => {
        const status = Object.values(formControls).reduce((prevStatus, currControl) => {
            if (prevStatus === false) {
                return false;
            }

            const answer = formControls[currControl].reduce((prevStatusCurrControl, currRuleForControl) => {
                if (prevStatusCurrControl === false) {
                    return false;
                }

                return currRuleForControl(form.elements[currControl].value);
            }, true);
            return answer;
        }, true);
        return status;
    };

    const submit = evt => {
        evt.preventDefault();
        if (validate) {
            submitCallback(form);
            reset();
        } else {
            console.log('не прошла валидация');
        }
    };

    const reset = () => {
        form.reset();
    };

    form.addEventListener('submit', submit);
    return {
        submit,
        reset,
    };
}

export default Form;

import FormField from "./FormField.js";

export default class PasswordField extends FormField {
    constructor(id, submitButton, passwordId) {
        super(id, submitButton);

        this.passwordField = document.getElementById(passwordId);
    }


    validate(value) {
        let errors = [];
        if (this.passwordField.querySelector("input").value !== value) {
            errors.push("Passwords do not match");
        }
        return errors;
    }
}
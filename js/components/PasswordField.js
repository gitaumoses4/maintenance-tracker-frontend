import FormField from "./FormField.js";

export default class PasswordField extends FormField {
    constructor(id, submitButton) {
        super(id, submitButton);
    }


    validate(value) {
        let errors = [];
        if (value.length < 8) {
            errors.push("Password should be more than 8 characters.");
        } else if (value.trim() === '') {
            errors.push("Password cannot be empty spaces only.")
        } else if (PasswordField.palindrome(value)) {
            errors.push("Password cannot be a palindrome");
        }

        return errors;
    }

    static palindrome(password) {
        let center = Math.round(password.length / 2);

        let all = password.split("");

        let left = all.slice(0, center);
        let right = all.slice(center);
        if (password.length % 2 !== 0) {
            left = all.slice(0, center - 1);
        }
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[left.length - 1 - i]) {
                return false;
            }
        }
        return true;
    }
}
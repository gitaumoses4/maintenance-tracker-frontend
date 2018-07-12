import Component from "./Component.js";


/**
 * A form field is a component with an input field that requires validation
 */
export default class FormField extends Component {
    constructor(id, submitButton) {
        super(id, {});
        this.submitButton = submitButton;
    }

    /**
     * Find the <input> element and listen for text input
     */
    onDOMLoaded() {
        this.input = this.element.querySelector("input");
        this.validationError = this.element.querySelector(".error");

        this.input.oninput = () => {
            let errors = this.validate(this.input.value);
            if (errors.length > 0) {
                this.validationError.innerHTML = `${ errors.map(error => `<li>${error}</li>`).join("")}`;
                this.submitButton.setAttribute("disabled", "true");
            }else{
                this.validationError.innerHTML = ``;
                this.submitButton.removeAttribute("disabled");
            }
        }
    }

    validate(value) {
        return [];
    }
}
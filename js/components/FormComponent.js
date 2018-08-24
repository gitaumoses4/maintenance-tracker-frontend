import WebComponent from "./WebComponent.js";


/**
 * A Form component is a web component that submits data to the API
 */
export default class FormComponent extends WebComponent {

    constructor(id, method, url, headers) {
        super(id, method, url, headers);
    }

    onDOMLoaded() {
        super.onDOMLoaded();
        this.element.addEventListener("submit", (event) => {
            event.preventDefault();
            let errors = this.validate();
            if (errors.length === 0) {
                this.submit();
            } else {
                this.data = {"message": errors};
                this.error();
            }
        })
    }

    /**
     * Invoke this method to personally submit the form without the onsubmit function
     */
    submit() {
        let formData = new FormData(this.element);
        let object = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });

        this.body = object;

        this.load(object);
    }

    /**
     * Validate the form's values before submitting it
     * @returns {Array}
     */
    validate() {
        return [];
    }

    /**
     * Get the value of a form field
     */
    getValue() {
        let formData = new FormData(this.element);
        let object = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });

        return object;
    }

    loading() {
        this.element.classList.remove("error");
        this.element.classList.remove("success");
        this.element.classList.add("loading");
    }

    notLoading() {
        this.element.classList.remove("loading");
    }

    success() {
        this.element.classList.remove("loading");
        this.element.classList.add("success");
        this.element.classList.remove("error");
    }

    error() {
        this.element.classList.remove("loading");
        let data = this.data;
        this.element.classList.add("error");
        this.element.classList.remove("success");

        let errorPanel = this.element.querySelector(".error");

        if (errorPanel) {
            errorPanel.style.display = '';
            errorPanel.innerHTML = `
					<ul>
						${data.message.map(info => `<li>${info}</li>`).join("")}
					</ul>`;
        }
    }
}

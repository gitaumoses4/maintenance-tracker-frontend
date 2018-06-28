import WebComponent from "./WebComponent.js";

export default class FormComponent extends WebComponent {

    constructor(id, method, url, headers) {
        super(id, method, url, headers);
    }

    onDOMLoaded() {
        this.element.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submit();
        })
    }

    submit() {
        let formData = new FormData(this.element);
        let object = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });

        this.load(object);
    }

    loading() {
        this.element.classList.add("loading");
    }

    success() {
        this.element.classList.remove("loading");
        let data = this.data;

        if (data.status === "error") {
            this.element.classList.add("error");
            this.element.classList.remove("success");

            let errorPanel = this.element.querySelector(".error");

            if (errorPanel) {
                errorPanel.style.display = '';
                errorPanel.innerHTML = `
					<ul>
						${data.message.map(info => `<li>${info}</li>`)}
					</ul>
				`;
            }
        } else {
            this.element.classList.add("success");
            this.element.classList.remove("error");
        }
    }
}

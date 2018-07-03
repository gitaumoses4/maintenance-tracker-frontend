import FormComponent from "./FormComponent.js";

export default class SignUpForm extends FormComponent {

    constructor(id) {
        super(id, "POST", API_BASE_URL + "/auth/signup", HEADERS);
    }


    success() {
        super.success();
        window.setTimeout(() => {
            window.location.href = "login.html";
        }, 1000)
    }
}
import FormComponent from "./FormComponent.js";

export default class SignUpForm extends FormComponent {

    constructor(id) {
        super(id, "POST", API_BASE_URL + "/auth/signup", HEADERS);
    }


    success() {
        super.success();

        this.loading();
        let that = this;
        fetch(API_BASE_URL + "/auth/login", {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(this.body)
        }).then(response => response.json())
            .then(data => {
                that.notLoading();
                setUserDetails(data.data.token, data.data.user);
                window.location.href = "verify-account.html";
            })
    }
}
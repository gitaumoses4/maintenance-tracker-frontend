import FormComponent from "./FormComponent.js";

export default class LoginForm extends FormComponent {
    constructor(id) {
        super(id, "POST", API_BASE_URL + '/auth/login', HEADERS);
    }

    success() {
        super.success();
        setUserDetails(this.data.data.token, this.data.data.user);
        window.location.href = isAdmin() ? "/admin" : "/user";
    }
}
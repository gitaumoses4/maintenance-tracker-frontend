import FormComponent from "./FormComponent.js";

/**
 * The Login Form Component
 */
export default class LoginForm extends FormComponent {
    constructor(id) {
        super(id, "POST", API_BASE_URL + '/auth/login', HEADERS);
    }

    /**
     * Redirect the user if they have logged in successfully
     */
    success() {
        super.success();
        setUserDetails(this.data.data.token, this.data.data.user);
        window.location.href = this.data.data.user.verified === 1 ? (isAdmin() ? "/admin" : "/user") : "verify-account.html";
    }
}
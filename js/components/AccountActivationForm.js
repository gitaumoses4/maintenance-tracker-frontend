import FormComponent from "./FormComponent.js";

/**
 * The account activation form displayed for user to enter their activation PIN
 */
export default class AccountActivationForm extends FormComponent {
    constructor(id) {
        super(id, "POST", API_BASE_URL + "/auth/verify", getAuthHeaders());
    }


    /**
     * Redirect the user on success
     */

    success() {
        super.success();
        setUserDetails(getAuthToken(), this.data.data.user);
        window.location.href = "/user";
    }

}
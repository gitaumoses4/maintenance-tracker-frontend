import FormComponent from "./FormComponent.js";

export default class AccountActivationForm extends FormComponent {
    constructor(id) {
        super(id, "POST", API_BASE_URL + "/auth/verify", getAuthHeaders());
    }


    success() {
        super.success();
        setUserDetails(getAuthToken(), this.data.data.user);
        window.location.href = "/user";
    }

}
import FormComponent from "./FormComponent.js";

export default class RequestFeedbackForm extends FormComponent {

    constructor(id, request_id) {
        super(id, "POST", API_BASE_URL + "/requests/" + request_id + "/feedback", getAuthHeaders())
    }

    render() {
        return `
                <div class="status">
                    <div class="mg segment error">
                    </div>
                </div>
                <div class="field">
                    <textarea cols="100" rows="10" name="message"></textarea>
                </div>
               <div class="field">
                   <button class="mg primary button">Submit</button>
                </div>`
    }

    success() {
        super.success();
        if (this.onSuccessListener) {
            this.onSuccessListener.apply(this);
        }
    }


    setOnSuccessListener(onSuccessListener) {
        this.onSuccessListener = onSuccessListener;
    }
}
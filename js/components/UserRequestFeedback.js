import WebComponent from "./WebComponent.js";

export default class UserRequestFeedback extends WebComponent {

    constructor(element, request_id) {
        super(element, "GET", API_BASE_URL + "/users/requests/" + request_id + "/feedback", getAuthHeaders());
    }

    static empty() {
        return `
            <div class="mg segment">
                <div class="content empty">
                    No feedback on this request.
                </div>
            </div>
        `
    }

    success() {
        super.success();
        this.element.innerHTML = this.data.data.length === 0 ? UserRequestFeedback.empty() :
            `${this.data.data.feedback.map(feedback => `
            <div class="feedback">
                <img src="../images/user-male.png" alt="" class="mg tiny circle image">
                <div class="content">
                    <div class="title">
                        ${feedback.admin.firstname} ${feedback.admin.lastname}
                    </div>
                    <div class="date">
                        ${ new Date(Date.parse(feedback.feedback.created_at)).toDateString() }
                    </div>
                    <div class="description">
                        ${feedback.feedback.message}
                    </div>
                </div>
            </div>
            `)}
            `
    }
}
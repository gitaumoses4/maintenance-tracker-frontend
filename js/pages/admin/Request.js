import {AdminDashboard} from "./AdminDashboard.js";
import AdminRequest from "../../components/AdminRequest.js";
import RequestFeedbackForm from "../../components/RequestFeedbackForm.js";
import UserRequestFeedback from "../../components/UserRequestFeedback.js";

export class Request extends AdminDashboard {
    constructor() {
        super();
    }


    mainContent() {
        return `
        <div class="mg container">
            <div id="admin-request"></div>
            <div class="padded">
                <h2>Provide Feedback</h2>
                <div class="feedback-container" id="request-feedback">
                </div>
                <div class="mg vertical divider"></div>
                <div class="mg row" style="margin-top: 3em;">
                    <div class="two-large three-medium column">
                        <img src="../images/user-male.png" alt="" class="mg small circle image feedback-profile"/>
                    </div>
                    <div class="ten-large nine-medium twelve-small column">
                        <form class="mg form" id="request-feedback-form">

                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    }

    registerComponents() {
        const adminRequest = new AdminRequest("admin-request", getQueryParameter("id"));
        adminRequest.load();

        const requestFeedbackForm = new RequestFeedbackForm("request-feedback-form", getQueryParameter("id"));

        const requestFeedback = new UserRequestFeedback("request-feedback", getQueryParameter("id"));
        requestFeedback.load();

        requestFeedbackForm.setOnSuccessListener(function () {
            requestFeedback.load();
        })
    }
}

new Request();
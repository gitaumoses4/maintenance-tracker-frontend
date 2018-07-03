import {Dashboard} from "./Dashboard.js";
import AllFeedback from "../../components/AllFeedback.js";

export class Feedback extends Dashboard {
    constructor() {
        super();
    }
    
    getSidebarActiveItem(){
        return isAdmin() ? 3 : 2;
    }

    registerComponents() {
        const feedback = new AllFeedback("user-feedback");
        feedback.load();
    }

    mainContent() {
        return `
        <div class="mg container">
            <div class="mg segment">
                <div class="header">All Feedback</div>
                <div class="content feedback-container" id="user-feedback">

                </div>
            </div>
        </div>`;
    }
}

new Feedback();
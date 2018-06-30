import WebComponent from "./WebComponent.js";

export default class LatestFeedback extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + '/users/feedback', getAuthHeaders());
    }

    render() {
        return "";
    }

    success() {
        super.success();
        let data = this.data;
        if (data.data.length === 0) {
            this.element.innerHTML = `
            <div  class="empty">
                No feedback yet <br/>
                <i class="fas fa-database"></i>
            </div>`
        } else {
            this.element.innerHTML =
                `${data.data.map(feed => `
                    <a class="feedback" href="request.html?id=${ feed.feedback.request }">
                        <img src="../images/user-male.png" alt="" class="mg tiny circle image">
                        <div class="content">
                            <div class="title">
                                ${ feed.created_by.firstname } ${ feed.created_by.lastname }
                            </div>
                            <div class="date">
                                ${ feed.feedback.updated_at }
                            </div>
                            <div class="description">
                                ${ feed.feedback.message }
                            </div>
                        </div>
                    </a>`).join('')}`
        }
    }
}
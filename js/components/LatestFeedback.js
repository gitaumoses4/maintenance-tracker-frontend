import WebComponent from "./WebComponent.js";

/**
 * Displays the latest feedback for the user
 */
export default class LatestFeedback extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + '/users/feedback', getAuthHeaders());
    }

    /**
     *
     * @returns {string}
     */
    render() {
        return "";
    }

    /**
     * Render the component on successful loading of feedback
     */
    success() {
        super.success();
        let data = this.data;
        if (data.data.feedback.length === 0) {
            this.element.innerHTML = `
            <div  class="empty">
                No feedback yet <br/>
                <i class="fas fa-database"></i>
            </div>`
        } else {
            let feedback = data.data.feedback.slice(0, 4);
            this.element.innerHTML =
                `${feedback.map(feed => `
                    <a class="feedback" href="request.html?id=${ feed.request }">
                        <img src="../images/user-male.png" alt="" class="mg tiny circle image">
                        <div class="content">
                            <div class="title">
                                ${ feed.admin.firstname } ${ feed.admin.lastname }
                            </div>
                            <div class="date">
                                ${ prettyDate(feed.updated_at) }
                            </div>
                            <div class="description">
                                ${ feed.message }
                            </div>
                        </div>
                    </a>`).join('')}`
        }
    }
}
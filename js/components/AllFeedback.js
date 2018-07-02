import WebComponent from "./WebComponent.js";
import Paginator from "./Paginator.js";

export default class AllFeedback extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + '/users/feedback', getAuthHeaders());
    }

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
            let feedback = data.data.feedback;
            this.element.innerHTML =
                `
                <div class="mg row">
                    <div class="mg paginator center"></div>
                </div>
                ${feedback.map(feed => `
                    <a class="feedback" href="request.html?id=${ feed.request }">
                        <img src="../images/user-male.png" alt="" class="mg tiny circle image">
                        <div class="content">
                            <div class="title">
                                ${ feed.admin.firstname } ${ feed.admin.lastname }
                            </div>
                            <div class="date">
                                ${ new Date(Date.parse(feed.updated_at)).toDateString() }
                            </div>
                            <div class="description">
                                ${ feed.message }
                            </div>
                        </div>
                    </a>`).join('')}`;
            let paginator = new Paginator(this.element.querySelector(".paginator"), data.data.current_page, data.data.last_page);
            let that = this;
            paginator.setOnPageChangeListener(function (page) {
                that.loadPage(page)
            })
        }
    }
}
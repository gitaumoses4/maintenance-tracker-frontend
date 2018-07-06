import WebComponent from "./WebComponent.js";
import UserRequestFeedback from "./UserRequestFeedback.js";

export default class UserRequest extends WebComponent {
    constructor(id, request_id) {
        super(id, "GET", API_BASE_URL + "/users/requests/" + request_id, getAuthHeaders());
        this.request_id = request_id;
    }

    static renderStatus(status, current) {
        return `
            <div class="step ${ status.index < current ? (current === 4 ? '' : 'completed') : (current === 4 ? 'failed active' : (current === status.index ? 'active' : '')) }">
                <i class="icon fas ${ status.icon }"></i>
                <div class="body">
                    <div class="title">${ status.title }</div>
                    <div class="description">${ status.description }</div>
                </div>
            </div>
        `
    }

    success() {
        super.success();
        let data = this.data;

        let statuses = [
            {
                "title": "Pending",
                "index": 1,
                "description": "Request pending approval",
                "icon": "fa-clock"
            }, {
                "title": "Approved",
                "index": 2,
                "description": "Your product is being repaired",
                "icon": "fa-cogs"
            }, {
                "title": "Resolved",
                "index": 3,
                "description": "Your product has been repaired",
                "icon": "fa-cog"
            }, {
                "title": "Disapproved",
                "index": 4,
                "description": "Your repair request was rejected",
                "icon": "fa-cross"
            }
        ];
        let indices = {"Pending": 1, "Approved": 2, "Resolved": 3, "Disapproved": 4};
        this.element.innerHTML = `
                <div class="mg row">
                    <div class="mg steps center aligned">
                        ${ statuses.map(status => UserRequest.renderStatus(status, indices[data.data.request.status]))}
                    </div>
                </div>
                <div class="mg row">
                    <div class="six-large eight-medium twelve-small column center aligned">
                        <div class="padded">
                            <h1>
                                ${ data.data.request.product_name }
                            </h1>
                            <div class="center">
                                <img src="${ data.data.request.photo || '../images/placeholder.png' }" class="mg large image center aligned"/>
                                <p>
                                    ${ data.data.request.description }
                                </p>
                                <a href="edit-request.html?id=${ data.data.request.id}" class="mg primary button ${ data.data.request.status.toLowerCase() !== 'pending' ? 'disabled' : ''}">Edit Request</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mg vertical divider"></div>
                <div class="mg container">
                      <h2>Feedback</h2>
                    <div class="feedback-container" id="user-request-feedback">
                    </div>
                </div>
            `;
        let feedback = new UserRequestFeedback(this.element.querySelector("#user-request-feedback"), this.request_id);
        feedback.load();
    }

    error() {
        super.error();
        this.element.innerHTML =
            `
                <div class="mg container">
                    <div class="mg segment" style="margin-top: 4em;">
                        <div class="header">
                            ${ this.statusCode === 404 ? "Not found" : "Not allowed" }
                        </div>
                        <div class="content">
                            ${ this.data.message }
                            <br>
                            <br>
                            <a href="/user/" class="mg primary button">Back to dashboard</a>
                        </div>
                    </div>
                </div>
            `;
    }
}
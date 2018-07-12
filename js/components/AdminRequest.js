import WebComponent from "./WebComponent.js";


/**
 * Component to display the admin maintenance/repair request
 */
export default class AdminRequest extends WebComponent {
    constructor(id, request_id) {
        super(id, "GET", API_BASE_URL + "/users/requests/" + request_id, getAuthHeaders());
        this.request_id = request_id;
    }


    /**
     * Display the Maintenance/Repair request to the Admin
     */
    success() {
        super.success();
        let data = this.data;
        let request = data.data.request;
        this.element.innerHTML =
            `
                <div class="mg segment">
                <div class="header">
                    Maintenance / Repair Request
                </div>
                <div class="content">
                    <div class="mg row">
                        <div class="six-medium twelve-small six-large column">
                            <img class="mg image" src="${ request.photo || '../images/placeholder.png' }"/>
                        </div>
                        <div class="six-large six-medium twelve-small column">
                            <div style="padding: 2em">
                                <div class="mg row centered">
                                    <img src="../images/user-female.png" class="mg small circle image"/>
                                    <div class="padded">
                                        <div>Posted by: <b>${ request.created_by.firstname + " " + request.created_by.lastname}</b></div>
                                        <div>${ prettyDate(request.created_at) }</div>
                                    </div>
                                </div>
                                <div class="mg vertical divider"></div>
                                <h2>${ request.product_name }</h2>
                                <p>
                                    ${ request.description }
                                </p>
                                <h2>Request Status</h2>
                                <h3>Current Status: <b>${ request.status }</b></h3>
                                <form class="mg form">
                                    <div class="field">
                                        <select id="request_status">
                                            <option value="approve" ${ request.status === 'Approved' ? 'selected disabled' : (request.status !== 'Pending' ? 'disabled' : '') }>Approve</option>
                                            <option value="disapprove" ${ request.status === 'Disapproved' ? 'selected disabled' : '' }>Disapprove</option>
                                            <option value="resolve" ${ request.status === 'Resolved' ? 'selected disabled' : '' }>Resolve</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <button class="mg primary button">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        // update the details of a request if the status changes
        let that = this;
        this.element.querySelector("form").addEventListener("submit", function (event) {
            event.preventDefault();
            let status = this.querySelector("#request_status").value;
            that.loading();
            fetch(API_BASE_URL + "/requests/" + that.request_id + "/" + status, {
                method: "PUT",
                headers: getAuthHeaders()
            }).then(response => response.json())
                .then(data => {
                    that.load();
                });
        });
    }
}
import Component from "./Component.js";
import WebComponent from "./WebComponent.js";

export default class UserOptions extends Component {
    constructor(id) {
        super(id, getUser());
    }

    render() {
        let data = this.data;
        return `
            <div class="trigger">
                <div class="account-options" id="user-name">
                    <div class="title">${ data.firstname } ${ data.lastname }</div>
                    <img src="../images/user-male.png" class="mg tiny image"/>
                </div>
            </div>
            <div class="menu" style="width: 100%">
                ${ isAdmin() ? `
                        <a class="item" id="admin_pending_requests_menu_item" href="requests.html?status=pending">
                            
                        </a>` : '' }
                <a class="item" onclick="logout()">Logout <i class="fas fa-sign-out-alt"></i></a>
            </div>`;
    }

    onRender() {
        if (isAdmin()) {
            let pendingRequests = new PendingRequests(this.element.querySelector("#admin_pending_requests_menu_item"));
            pendingRequests.load();
        }
        initDropdown(this.element);
    }
}


export class PendingRequests extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + "/requests/pending", getAuthHeaders());
    }

    success() {
        super.success();
        this.element.querySelector("button").innerHTML = `${ this.data.data.num_results } `
    }

    render() {
        return `Pending Requests
                            <button class="mg very tiny circle button primary">0</button>`
    }
}

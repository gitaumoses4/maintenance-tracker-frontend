import WebComponent from "./WebComponent.js";

export default class ResolvedRequests extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + '/users/requests/resolved', getAuthHeaders());
    }

    render() {
        return "";
    }

    success() {
        super.success();
        let data = this.data;
        this.element.innerHTML = `
           <div class="header">
                Resolved Repair Requests
            </div>
            <div class="content" style="color: #469d4a">
                <h1 class="count">${ data.data.total_results }</h1>
            </div>
            <div class="footer">
                <a href="requests.html?status=resolved" class="right aligned">View...</a>
            </div>
        `
    }
}

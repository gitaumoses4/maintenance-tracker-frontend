import WebComponent from "./WebComponent.js";


export default class DisapprovedRequestCount extends WebComponent {
    constructor() {
        super("user-home-rejected", "GET", API_BASE_URL + '/users/requests/disapproved', getAuthHeaders());
    }

    render() {
        return "";
    }

    success() {
        super.success();
        let data = this.data;
        this.element.innerHTML = `
           <div class="header">
                Disapproved Repair Requests
            </div>
            <div class="content" style="color: red">
                <h1 class="count">${ data.data.total_results }</h1>
            </div>
            <div class="footer">
                <a href="requests.html?status=disapproved" class="right aligned">View...</a>
            </div>
        `
    }
}
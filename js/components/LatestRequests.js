import WebComponent from "./WebComponent.js";

export default class LatestRequests extends WebComponent {
    constructor(id, status = "all") {
        super(id, "GET", API_BASE_URL + (!isAdmin() ? "/users/requests/" : "/requests/") + status, getAuthHeaders())
    }

    loading() {
        this.element.querySelector(".content").classList.add("loading");
    }

    render() {
        return `
            <div>
                <h2>Latest Maintenance/Repair Requests</h2>
                <div class="content"></div>
            </div>
        `
    }

    static empty() {
        return `
        <div class="mg segment fluid">
            <div class="content">
                <div class="empty">
                    <h3>No maintenance/repair requests <br>
                    <i class="fas fa-database"></i>
                    </h3>
                    ${ !isAdmin() ? `<a href="new-request.html" class="mg primary button">Make Request </a>` : ""  }
                </div>
            </div>
        </div>
        `
    }

    static renderRequest(request) {
        let colors = {
            "Resolved": "teal",
            "Pending": "blue-grey",
            "Approved": "success",
            "Disapproved": "danger"
        };
        return `
            <tr onclick="window.location.href = 'request.html?id=${request.id}'">
                <td><a href="request.html?id=${ request.id }">#${ request.id }</a></td>
                <td>${ prettyDate(request.created_at) }</td>
                <td>${ request.product_name }</td>
                <td>
                    <img src="${ request.photo || '../images/placeholder.png'}" class="mg small image"/>
                </td>
                <td>${ request.description }</td>
                <td>
                    <button class="mg ${colors[request.status]} circle tiny button">
                        <i class="fas fa-cogs"></i>
                    </button>
                    <div class="title">${ request.status }</div>
                </td>
            </tr>
        `
    }

    success() {
        let content = this.element.querySelector(".content");
        content.classList.remove("loading");
        let data = this.data;
        if (data.data.requests.length === 0) {
            content.innerHTML = LatestRequests.empty();
        } else {
            content.innerHTML = `
            <div class="mg table">
                <table>
                    <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Request Date</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Repair/Maintenance Request Description</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${ data.data.requests.map(request => LatestRequests.renderRequest(request)).join("")}
                    </tbody>
                </table>
            </div>
            `
        }
    }
}
import WebComponent from "./WebComponent.js";

export default class LatestRequests extends WebComponent {
    constructor(id, user = true) {
        super(id, "GET", API_BASE_URL + (user ? "/users/requests/all" : "/requests/all"), getAuthHeaders())
    }

    loading() {
        this.element.querySelector(".mg.table").classList.add("loading");
    }

    render() {
        return `
            <div>
                <h2>Latest Maintenance/Repair Requests</h2>
                <div class="mg table"></div>
            </div>
        `
    }

    static empty() {
        return `
            <div class="empty">
                No maintenance/repair requests <br/>
                <i class="fas fa-database"></i>
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
            <tr>
                <td><a href="request.html?id=${ request.id }">#${ request.id }</a></td>
                <td>${ request.created_at }</td>
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
        let content = this.element.querySelector(".mg.table");
        content.classList.remove("loading");
        let data = this.data;
        if (data.data.requests.length === 0) {
            content.innerHTML = LatestRequests.empty();
        } else {
            content.innerHTML = `
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
            `
        }
    }
}
class ResolvedRequests extends WebComponent {
    constructor() {
        super("user-home-resolved", "GET", API_BASE_URL + '/users/requests/resolved', getAuthHeaders());
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

class DisapprovedRequests extends WebComponent{
    constructor() {
        super("user-home-resolved", "GET", API_BASE_URL + '/users/requests/resolved', getAuthHeaders());
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

resolved = new ResolvedRequests();
resolved.load();
import {AdminDashboard} from "./AdminDashboard.js";
import AdminRequests from "../../components/AdminRequests.js";

export class Requests extends AdminDashboard {
    constructor() {
        super();
    }

    mainContent() {
        return `
            <div class="mg row centered">
                <h2>All Maintenance /Repair Requests</h2>
            </div>
            <div class="mg row">
                <div class="twelve-large twelve-medium twelve-small column">
                    <div id="admin-requests" style="width: 100%"></div>
                </div>
            </div>`
    }

    registerComponents() {
        let status = getQueryParameter("status");

        const adminRequests = new AdminRequests("admin-requests", status ? status : "all");
        adminRequests.load();
    }

    getSidebarActiveItem(){
        return 2;
    }
}


new Requests();
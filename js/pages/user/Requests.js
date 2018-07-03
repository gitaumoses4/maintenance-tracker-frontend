import {Dashboard} from "./Dashboard.js";
import UserRequests from "../../components/UserRequests.js";

export class Requests extends Dashboard {
    constructor() {
        super();
    }


    getSidebarActiveItem() {
        return isAdmin() ? 2 : 1;
    }

    mainContent() {
        return `<div id="user-requests"> </div>`
    }


    registerComponents() {
        let status = getQueryParameter("status");
        let userRequests = new UserRequests("user-requests", status || "all");
        userRequests.load();
    }
}

new Requests();
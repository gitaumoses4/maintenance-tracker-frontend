import {Dashboard} from "../user/Dashboard.js";
import LatestRequests from "../../components/LatestRequests.js";

export class AdminDashboard extends Dashboard {
    constructor() {
        super();
    }

    quickLinks() {
        return `
        <h2>Requests</h2>
        <div class="mg row">
            <a class="request button" href="requests.html?status=resolved">
                <button class="mg teal circle small button">
                    <i class="fas fa-cogs"></i>
                </button>
                <div class="title">Resolved</div>
            </a>
            <a class="request button" href="requests.html?status=disapproved">
                <button class="mg danger circle small button">
                    <i class="fas fa-times"></i>
                </button>
                <div class="title">Disapproved</div>
            </a>
            <a class="request button" href="requests.html?status=approved">
                <button class="mg success circle small button">
                    <i class="fas fa-check"></i>
                </button>
                <div class="title">Approved</div>
            </a>
            <a class="request button" href="requests.html?status=pending">
                <button class="mg blue-grey circle small button">
                    <i class="fas fa-clock"></i>
                </button>
                <div class="title">Pending</div>
            </a>
        </div>
        <div class="mg vertical divider"></div>`
    }

    getTitle() {
        return "Maintenance Tracker - Admin Panel";
    }

    getSidebarActiveItem(){
        return 0;
    }

    getSideBarMenuItems() {
        return [
            {
                "title": "Admin Dashboard",
                "href": "/admin",
                "icon": "fa-tachometer-alt"
            },
            {
                "title": "User Dashboard",
                "href": "/user",
                "icon": "fa-tachometer-alt"
            },
            {
                "title": "Repair Requests",
                "href": "requests.html",
                "icon": "fa-cogs"
            },
            {
                "title": "Registered Users",
                "href": "users.html",
                "icon": "fa-user"
            }
        ];
    }

    mainContent() {
        return `<div id="admin-latest-requests"></div>`;
    }

    registerComponents(){
        const latestRequests = new LatestRequests("admin-latest-requests");
        latestRequests.load();
    }
}

new AdminDashboard();
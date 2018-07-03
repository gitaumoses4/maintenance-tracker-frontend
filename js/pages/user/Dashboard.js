import App from "../App.js";
import Notifications, {MobileNotifications} from "../../components/Notifications.js";
import UserOptions from "../../components/UserOptions.js";
import LatestRequests from "../../components/LatestRequests.js";
import LatestFeedback from "../../components/LatestFeedback.js";
import ResolvedRequests from "../../components/ResolvedRequestCount.js";
import DisapprovedRequestCount from "../../components/DisapprovedRequestCount.js";

export class Dashboard extends App {
    constructor() {
        super();
    }

    navBarMenu() {
        return ` 
            <div class="link item" id="largeScreenNotifications">
                <div class="mg dropdown notifications" id="user-home-notifications">

                </div>
            </div>
            <div class="item right aligned">
                <div class="mg dropdown" id="user-options">

                </div>
            </div>`;
    }
    getSidebarActiveItem(){
        return isAdmin() ? 1 : 0;
    }


    getTitle() {
        return "Maintenance Tracker - User Panel"
    }

    getSideBarMenuItems() {
        let items = [];
        if (isAdmin()) {
            items.push({
                "title": "Admin Dashboard",
                "href": "/admin",
                "icon": "fa-tachometer-alt"
            })
        }
        items = items.concat([
            {
                "title": isAdmin() ? "User Dashboard" : "My Dashboard",
                "href": "/user",
                "icon": "fa-tachometer-alt"
            },
            {
                "title": "Repair Requests",
                "href": "requests.html",
                "icon": "fa-cogs"
            },
            {
                "title": "My Feedback",
                "href": "feedback.html",
                "icon": "fa-comments"
            },
            {
                "title": "My Notifications",
                "id": "mobileNotifications",
                "icon": "fa-bell"
            }
        ]);
        return items;
    }

    content() {
        return `${this.quickLinks()}
                ${this.mainContent()}
                ${this.mobileNotificationsDialog()}`;
    }

    mainContent() {
        return `
        <div class="mg row">
            <div class="three-large six-medium six-small column">
                <div class="padded">
                    <div class="mg segment fluid" id="user-home-resolved">

                    </div>
                </div>
            </div>
            <div class="three-large six-medium six-small column">
                <div class="padded">
                    <div class="mg segment" id="user-home-rejected">

                    </div>
                </div>
            </div>
            <div class="six-large twelve-medium twelve-small column">
                <div class="padded">
                    <div class="mg segment fluid">
                        <div class="header">
                            Latest Feedback
                        </div>
                        <div class="content feedback-container" id="user-home-feedback">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mg vertical divider"></div>
        <div id="user-home-requests"></div>`
    }

    quickLinks() {
        return `
        <h2>Requests</h2>
            <div class="mg row">
                <a class="request button" href="new-request.html">
                    <button class="mg blue-grey circle small button">
                        <i class="fas fa-plus"></i>
                    </button>
                    <div class="title">Make Request</div>
                </a>
                <a class="request button" href="feedback.html">
                    <button class="mg pink circle small button">
                        <i class="fas fa-comments"></i>
                    </button>
                    <div class="title">Feedback</div>
                </a>
            </div>
            <div class="mg vertical divider"></div> `;
    }

    mobileNotificationsDialog() {
        return `
            <div class="mg modal" data-trigger="mobileNotifications">
                <div class="body">
                    <i class="close fas fa-times"></i>
                    <div class="title">
                        Notifications
                    </div>
                    <div class="content">
                        <div class="notifications" id="user-home-notifications-2">
                        </div>
                    </div>
                    <div class="footer">
                        <button class="mg primary button">Ok</button>
                    </div>
                </div>
            </div>`
    }

    onRender() {
        const desktopNotifications = new Notifications("user-home-notifications");
        desktopNotifications.load();

        initModal(this.element.querySelector(".mg.modal"));

        const mobileNotifications = new MobileNotifications("user-home-notifications-2");
        mobileNotifications.load();

        const userOptions = new UserOptions("user-options");
        super.onRender();
    }

    registerComponents() {
        const disapproved = new DisapprovedRequestCount("user-home-rejected");
        disapproved.load();

        const resolved = new ResolvedRequests("user-home-resolved");
        resolved.load();

        const feedback = new LatestFeedback("user-home-feedback");
        feedback.load();


        const latestRequests = new LatestRequests("user-home-requests");
        latestRequests.load();
    }
}

new Dashboard();
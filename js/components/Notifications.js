import WebComponent from "./WebComponent.js";
import NotificationItem from "./NotificationItem.js";


export default class Notifications extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + "/users/notifications/unread", getAuthHeaders());
    }

    loading() {

    }

    render() {
        return "";
    }

    static empty() {
        return `
            <div class="item"">
                <div class="content">
                    <div class="title">
                        No notifications
                    </div>
                    <div class="description">
                        You do not have any unread notifications
                    </div>
                </div>
            </div>`;
    }

    showNotification(notification) {
        let item = document.createElement("div");
        item.classList.add("item");
        return new NotificationItem(item, notification, this);
    }

    success() {
        super.success();
        let data = this.data.data;
        this.element.innerHTML = `
            <div class="trigger">
                Notifications
                <button class="mg very tiny circle button primary" style="margin-left: 1em;">
                    ${ data.total_results }
                </button>
            </div>`;
        let menu = document.createElement("div");
        menu.classList.add("menu");
        if (data.notifications.length === 0) {
            menu.innerHTML = Notifications.empty();
        } else {
            data.notifications.map(notification => {
                menu.appendChild(this.showNotification(notification).element);
            });
        }
        this.element.appendChild(menu);

        initDropdown(this.element);
    }
}

export class MobileNotifications extends Notifications {
    constructor(id) {
        super(id);
    }

    success() {
        let data = this.data.data;
        if(data.notifications.length === 0){
            this.element.innerHTML = MobileNotifications.empty();
        }else{
            data.notifications.map(notification => {
                this.element.appendChild(this.showNotification(notification).element);
            });
        }
    }
}
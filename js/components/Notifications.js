import WebComponent from "./WebComponent.js";


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
        return `<div class="item"">
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

    static showNotification(notification) {
        return `<div class="item" data-id="${notification.id}">
                    <div class="notification">
                        <i class="close fas fa-times"></i>
                        <img src="../images/user-male.png" alt="" class="mg tiny circle image">
                        <div class="content">
                            <div class="title">
                                ${ notification.admin.firstname } ${ notification.admin.lastname }
                            </div>
                            <div class="date">
                                ${ notification.created_at }
                            </div>
                            <div class="description">
                                ${ notification.message }
                            </div>
                        </div>
                    </div>
                </div>`;
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
            </div>
            <div class="menu">
                ${data.notifications.length === 0 ? Notifications.empty() :`${data.notifications.map(notification => Notifications.showNotification(notification)).join('')}`}
            </div>`;

        let that = this;
        if (data.notifications.length !== 0) {
            let items = this.element.getElementsByClassName("item");
            for (let i = 0; i < items.length; i++) {
                items[i].addEventListener("click", function () {
                    let id = items[i].dataset.id;
                    readNotification(id, that);
                });
            }
        }
        initDropdown(this.element);
    }
}

export class MobileNotifications extends Notifications {
    constructor(id) {
        super(id);
    }

    success() {
        let data = this.data.data;
        this.element.innerHTML = `${data.notifications.length === 0 ? Notifications.empty() :
            ` ${data.notifications.map(notification => MobileNotifications.showNotification(notification)).join('')}`}`;
        let that = this;
        if (data.notifications.length !== 0) {
            let items = this.element.getElementsByClassName("item");
            for (let i = 0; i < items.length; i++) {
                items[i].addEventListener("click", function () {
                    let id = items[i].dataset.id;
                    readNotification(id, that);
                });
            }
        }
    }
}

window.readNotification = (id, component) => {
    fetch(API_BASE_URL + "/users/notifications/" + id, {
        method: "PUT",
        headers: getAuthHeaders()
    }).then(response => response.json())
        .then(data => {
            component.load();
        })
};
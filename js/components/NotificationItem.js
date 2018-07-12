import Component from "./Component.js";

export default class NotificationItem extends Component {
    constructor(element, data, parent) {
        super(element, data);
        this.parent = parent;
    }

    onDOMLoaded() {
        let that = this;
        this.element.addEventListener("click", function () {
            let notification = that.data;
            if (that.data.id) {
                let actions = {"upgrade": "/admin", "signup": "/admin/users.html"};
                fetch(API_BASE_URL + "/users/notifications/" + that.data.id, {
                    method: "PUT",
                    headers: getAuthHeaders()
                }).then(response => response.json())
                    .then(data => {
                        that.parent.load();
                        window.location.href = actions.hasOwnProperty(notification.action) ? actions[notification.action] : (isAdmin() ? "/admin/": "/user/") +"request.html?id=" + notification.action;
                    })
            }
        });
    }

    render() {
        let notification = this.data;
        return notification ? `
        <div class="notification">
            <i class="close fas fa-times"></i>
            <img src="../images/user-male.png" alt="" class="mg tiny circle image">
            <div class="content">
                <div class="title">
                    ${ notification.admin.firstname } ${ notification.admin.lastname }
                </div>
                <div class="date">
                    ${ prettyDate(notification.created_at )}
                </div>
                <div class="description">
                    ${ notification.message }
                </div>
            </div>
        </div>` : "";
    }
}
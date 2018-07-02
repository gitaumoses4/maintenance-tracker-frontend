import Component from "./Component.js";

export default class NotificationItem extends Component {
    constructor(element, data, parent) {
        super(element, data);
        this.parent = parent;
    }

    onDOMLoaded(){
        let that = this;
        this.element.addEventListener("click", function () {
            if (that.data.id) {
                fetch(API_BASE_URL + "/users/notifications/" + that.data.id, {
                    method: "PUT",
                    headers: getAuthHeaders()
                }).then(response => response.json())
                    .then(data => {
                        that.parent.load();
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
                    ${ new Date(Date.parse(notification.created_at)).toDateString() }
                </div>
                <div class="description">
                    ${ notification.message }
                </div>
            </div>
        </div>` : "";
    }
}
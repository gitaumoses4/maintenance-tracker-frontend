const resolved = new View({
    id: "user-home-resolved"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/resolved",
    headers: getAuthHeaders()
}).start();


const rejected = new View({
    id: "user-home-rejected"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/disapproved",
    headers: getAuthHeaders()
}).start();


const feedback = new View({
    id: "user-home-feedback"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/feedback",
    headers: getAuthHeaders()
}).start();

const requests = new View({
    id: "user-home-requests"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/all",
    headers: getAuthHeaders()
}).start();

const notifications = new View({
    id: "user-home-notifications",
    methods: {
        readNotification: function (id) {
            console.log(id)
            fetch(API_BASE_URL + "/users/notifications/" + id, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: ''
            }).then(response => response.json())
                .then(data => {
                    notifications.start();
                    mobileNotifications.start();
                })
        }
    }
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/notifications/unread",
    headers: getAuthHeaders()
}).start().then(function () {
    initDropdown(document.getElementById("user-home-notifications"))
});

const mobileNotifications = new View({
    id: "user-home-notifications-2"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/notifications/unread",
    headers: getAuthHeaders()
}).start();

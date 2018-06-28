const API_BASE_URL = "http://localhost:5000/api/v2";
const HEADERS = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "all"};

let page = window.location.pathname;

// check user pages
guardUserPages(page);
redirectIfAuthenticated(page);

function redirectIfAuthenticated(page) {
    if (["/register.html", "/login.html"].indexOf(page) >= 0 && isAuthenticated()) {
        window.location.href = isAdmin() ? "/admin" : "/user";
    }
}

function guardUserPages(page) {
    if (page.startsWith("/user") && !isAuthenticated()) {
        window.location.href = "/login.html";
    }
}

function deleteUserDetails() {
    sessionStorage.clear();
}

function setUserDetails(token, user) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("firstname", user.firstname);
    sessionStorage.setItem("id", user.id);
    sessionStorage.setItem("lastname", user.lastname);
    sessionStorage.setItem("profile_picture", user.profile_picture);
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("username", user.username);
}


function isAuthenticated() {
    return getAuthToken() != null;
}

function getUser() {
    return {
        "id": sessionStorage.getItem("id"),
        "email": sessionStorage.getItem("email"),
        "firstname": sessionStorage.getItem("firstname"),
        "lastname": sessionStorage.getItem("lastname"),
        "profile_picture": sessionStorage.getItem("profile_picture"),
        "role": sessionStorage.getItem("role"),
        "username": sessionStorage.getItem("username")
    }
}

function isAdmin() {
    return getUser().role === "Administrator";
}

function getAuthToken() {
    return sessionStorage.getItem("token");
}

function getAuthHeaders() {
    if (isAuthenticated()) {
        HEADERS["Authorization"] = "Bearer " + getAuthToken();
    }
    return HEADERS;
}

function toJSON(form) {
    let formData = new FormData(form);
    let object = {};

    formData.forEach(function (value, key) {
        object[key] = value;
    });

    return object;
}

function fetchData(views) {

    fetchNext(0);

    function fetchNext(index) {
        views[index].start().then(function () {
            if (index < views.length - 1) {
                fetchNext(index + 1)
            }
        })
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//
//     if (isAuthenticated()) {
//         const logout = document.getElementById("logout");
//         logout.addEventListener("click", function () {
//             deleteUserDetails();
//             window.location.href = "../login.html";
//         });
//
//
//         new View({
//             id: "user-name",
//             data: {"user": getUser()}
//         });
//
//     }
//     if (page.startsWith("/user")) {
//         const mobileNotifications = new View({
//             id: "user-home-notifications-2"
//         }).load({
//             method: "GET",
//             url: API_BASE_URL + "/users/notifications/unread",
//             headers: getAuthHeaders()
//         }).start();
//
//         const notifications = new View({
//             id: "user-home-notifications",
//             methods: {
//                 readNotification: function (id) {
//                     console.log(id)
//                     fetch(API_BASE_URL + "/users/notifications/" + id, {
//                         method: "PUT",
//                         headers: getAuthHeaders(),
//                         body: ''
//                     }).then(response => response.json())
//                         .then(data => {
//                             notifications.start();
//                             mobileNotifications.start();
//                         })
//                 }
//             }
//         }).load({
//             method: "GET",
//             url: API_BASE_URL + "/users/notifications/unread",
//             headers: getAuthHeaders()
//         }).start().then(function () {
//             initDropdown(document.getElementById("user-home-notifications"))
//         });
//
//     }
// });
const API_BASE_URL = "https://maintenance-tracker-api.herokuapp.com/api/v2";
const HEADERS = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "all"};

let page = window.location.pathname;

// check user pages
guardUserPages(page);
guardAdminPages(page);
redirectIfAuthenticated(page);

function redirectIfAuthenticated(page) {
    if (["/register.html", "/login.html", "/verify-account.html"].indexOf(page) >= 0 && isAuthenticated()) {
        if (isVerified()) {
            window.location.href = isAdmin() ? "/admin" : "/user";
        }
    }
}

function guardAdminPages(page) {
    if (page.startsWith("/admin")) {
        if (isAuthenticated()) {
            if (!isAdmin()) {
                window.location.href = isVerified() ? "/user/" : "/verify-account.html";
            }
        } else {
            window.location.href = "/login.html";
        }
    }
    if (page === "/admin/request.html" && !getQueryParameter("id")) {
        window.location.href = "/admin/";
    }
}

function guardUserPages(page) {
    if (page.startsWith("/user")) {
        if (!isAuthenticated()) {
            window.location.href = "/login.html"
        }
        if (!isVerified()) {
            window.location.href = "/verify-account.html";
        }
    }
    if (page === "/user/request.html" && !getQueryParameter("id")) {
        window.location.href = "/user/";
    }
}

function getQueryParameter(key) {
    let url = new URL(window.location.href);
    return url.searchParams.get(key);
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
    sessionStorage.setItem("verified", user.verified);
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
        "verified": sessionStorage.getItem("verified"),
        "profile_picture": sessionStorage.getItem("profile_picture"),
        "role": sessionStorage.getItem("role"),
        "username": sessionStorage.getItem("username")
    }
}

function isVerified() {
    return getUser().verified === "1";
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

function logout() {
    deleteUserDetails();
    window.location.href = "../login.html";
}

function prettyDate(time) {
    let date = new Date(Date.parse(time) || ""), diff = (((new Date(Date.now())).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
        return time;
    }

    return day_diff === 0 &&
        (diff < 60 && "Just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor(diff / 3600) + " hours ago")
        ||
        (day_diff === 1 && "Yesterday" ||
            day_diff < 7 && day_diff + " days ago" ||
            day_diff < 31 && (Math.ceil(day_diff / 7) === 1 ? "1 week ago " : (Math.ceil(day_diff / 7)) + " weeks ago"))
}
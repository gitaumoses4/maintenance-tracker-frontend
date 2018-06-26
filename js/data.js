const API_BASE_URL = "http://localhost:5000/api/v2";
const HEADERS = {"Content-Type": "application/json"};

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

function setUserDetails(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", user.email);
    localStorage.setItem("firstname", user.firstname);
    localStorage.setItem("id", user.id);
    localStorage.setItem("lastname", user.lastname);
    localStorage.setItem("profile_picture", user.profile_picture);
    localStorage.setItem("role", user.role);
    localStorage.setItem("username", user.username);
}


function isAuthenticated() {
    return getAuthToken() != null;
}

function getUser() {
    return {
        "id": localStorage.getItem("id"),
        "email": localStorage.getItem("email"),
        "firstname": localStorage.getItem("firstname"),
        "lastname": localStorage.getItem("lastname"),
        "profile_picture": localStorage.getItem("profile_picture"),
        "role": localStorage.getItem("role"),
        "username": localStorage.getItem("username")
    }
}

function isAdmin() {
    return getUser().role === "Administrator";
}

function getAuthToken() {
    return localStorage.getItem("token");
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

function registerUser(form) {
    form.classList.add("loading");
    fetch(API_BASE_URL + "/auth/signup", {
        method: "post",
        headers: HEADERS,
        body: JSON.stringify(toJSON(form))
    }).then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                form.classList.remove("loading");

                let errorDisplay = form.getElementsByClassName("error")[0];
                errorDisplay.innerHTML = "<ul>" + bindListItems("<li>{{ data }}</li>", data.message) + "</ul>";
                form.classList.add("error");
            } else {
                loginUser(form);
            }
        });
    return false;
}

function networkError(form) {
    let errorDisplay = form.getElementsByClassName("error")[0];
    errorDisplay.innerHTML = "<ul><li>Error accessing the server. Please try again.</li></ul>";
}

function loginUser(form) {
    form.classList.add("loading");
    fetch(API_BASE_URL + "/auth/login", {
        method: "post",
        headers: HEADERS,
        body: JSON.stringify(toJSON(form))
    }).then(response => response.json())
        .then(data => {
            form.classList.remove("loading");
            if (data.status === "success") {
                setUserDetails(data.data.token, data.data.user);
                window.location.href = isAdmin() ? "/admin" : "/user";
            } else {
                let errorDisplay = form.getElementsByClassName("error")[0];
                errorDisplay.innerHTML = "<ul>" + bindObject("<li>{{ message }}</li>", data) + "</ul>";
                form.classList.add("error");
            }
        }).catch(function () {
        networkError(form)
    });
    return false;
}

function bindListItems(element, data) {
    let output = "";
    for (let i = 0; i < data.length; i++) {
        output += bindObject(element, {"data": data[i]});
    }

    return output;
}

function bindListObjects(element, data) {
    let output = "";
    for (let i = 0; i < data.length; i++) {
        output += bindObject(element, data[i]);
    }

    return output;
}

function bindObject(content, data) {
    let regExp = /{{ [A-Za-z0-9.]+ }}/g;
    let result;
    let output = content;
    while (result = regExp.exec(content)) {
        output = output.replace(result[0], getValue(result, data));
    }
    return output;
}

function getValue(variable, data) {
    variable = String(variable).replace("{{", "").replace("}}", "");

    let res = variable.split(".");
    let current = data;
    for (let i = 0; i < res.length; i++) {
        current = current[res[i].trim()]
    }
    return current;
}

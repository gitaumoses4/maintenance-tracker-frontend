new Component({
    id: "signUpForm",
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    headers: HEADERS,
    success: function (data) {
        if (data.status === "success")
            login(toJSON(document.getElementById("signUpForm")));
    }
});

function login(data) {
    fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: HEADERS
    }).then(
        response => response.json()
    ).then(
        data => {
            if (data.status === "success") {
                setUserDetails(data.data.token, data.data.user);
                window.location.href = isAdmin() ? "/admin" : "/user";
            }
        }
    )
}
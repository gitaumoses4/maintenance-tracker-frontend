new Component({
    id: "loginForm",
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    headers: HEADERS,
    success: function (data) {
        if (data.status === "success") {
            setUserDetails(data.data.token, data.data.user);
            window.location.href = isAdmin() ? "/admin" : "/user";
        }
    },
    error: function () {

    }
});
const resolved = new View({
    id: "user-home-resolved"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/resolved",
    headers: getAuthHeaders()
});


const rejected = new View({
    id: "user-home-rejected"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/rejected",
    headers: getAuthHeaders()
});


const feedback = new View({
    id: "user-home-feedback"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/feedback",
    headers: getAuthHeaders()
});

const requests = new View({
    id: "user-home-requests"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/all",
    headers: getAuthHeaders()
});

const all = [resolved, rejected, feedback, requests];

fetchData(all);
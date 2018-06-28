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



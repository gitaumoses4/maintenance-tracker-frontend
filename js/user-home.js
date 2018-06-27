new View({
    id: "user-home-resolved"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/resolved",
    headers: getAuthHeaders()
});


new View({
    id: "user-home-rejected"
}).load({
    method: "GET",
    url: API_BASE_URL + "/users/requests/rejected",
    headers: getAuthHeaders()
});
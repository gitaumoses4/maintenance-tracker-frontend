import WebComponent from "./WebComponent.js";

export default class AllUsers extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + "/users", getAuthHeaders());
    }

    renderUser(user) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${ user.id }</td>
            <td>${ user.username }</td>
            <td>${ user.firstname + " " + user.lastname }</td>
            <td>${ user.email }</td>
            <td>${ user.role } ${ user.role === "User" ? ` - <a href="#">Make Admin</a>` : ""}</td>
        `;
        let that = this;
        if (user.role === "User") {
            row.querySelector("a").addEventListener("click", function () {
                that.loading();
                fetch(API_BASE_URL + "/users/" + user.id + "/upgrade", {
                    method: "PUT",
                    headers: getAuthHeaders()
                }).then(response => response.json())
                    .then(data => {
                        that.load();
                    })
            });
        }
        return row;
    }

    success() {
        super.success();
        let users = this.data.data.users;
        this.element.innerHTML =
            `
               <div class="mg table">
                <table>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Full Names</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            `;
        let tbody = this.element.querySelector("tbody");
        users.map(user => {
            tbody.appendChild(this.renderUser(user))
        }).join("");
    }
}
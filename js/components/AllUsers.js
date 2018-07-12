import WebComponent from "./WebComponent.js";

/**
 * A table component that displays all the users in the system
 */
export default class AllUsers extends WebComponent {
    constructor(id) {
        super(id, "GET", API_BASE_URL + "/users", getAuthHeaders());
    }

    /**
     * Render a single row
     * @param user
     * @returns {HTMLTableRowElement}
     */
    renderUser(user) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${ user.id }</td>
            <td>${ user.username }</td>
            <td>${ user.firstname + " " + user.lastname }</td>
            <td>${ user.email }</td>
            <td>${ user.verified === 1 ? "Verfied" : "Not Verfied" }</td>
            <td>${ user.role } ${ (user.role === "User" &&  user.verified === 1) ? ` - <a href="#" class="mg primary tiny button">Make Admin</a>` : ""}</td>
        `;
        let that = this;
        if (user.role === "User" && user.verified === 1) {
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

    /**
     * Create the table on successful loading the user details
     */
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
                        <th>Account Status</th>
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
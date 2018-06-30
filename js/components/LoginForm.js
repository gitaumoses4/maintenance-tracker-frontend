import FormComponent from "./FormComponent.js";

export default class LoginForm extends FormComponent {
    constructor(id) {
        super(id, "POST", API_BASE_URL + '/auth/login', HEADERS);
    }

    render() {
        return `
            <div class="status">
                <div class="mg segment error">
                </div>
                <div class="mg segment success" m-else>
                    <ul>
                        <li>Login successful</li>
                    </ul>
                </div>
            </div>
            <div class="field">
                <label for="username">Username</label>
                <input id="username" name="username" required placeholder="Username"/>
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required
                       placeholder="Password"/>
            </div>
            <div class="field">
                <button class="mg fluid button primary">Login</button>
            </div>
            `;
    }

    success() {
        super.success();
        setUserDetails(this.data.data.token, this.data.data.user);
        window.location.href = isAdmin() ? "/admin" : "/user";
    }
}
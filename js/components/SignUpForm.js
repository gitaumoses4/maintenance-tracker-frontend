import FormComponent from "./FormComponent.js";

export default class SignUpForm extends FormComponent {

    constructor(id) {
        super(id, "POST", API_BASE_URL + "/auth/signup", HEADERS);
    }

    render() {
        return `
        <div class="status">
            <div class="mg segment error">
            </div>
            <div class="mg segment success" m-else>
                <ul>
                    <li>Registration successful</li>
                </ul>
            </div>
        </div>
        <div class="field">
            <label>Name</label>
            <div class="fields">
                <div class="six-small six-medium field">
                    <input name="firstname" required placeholder="First Name" type="text"/>
                </div>
                <div class="six-small six-medium field">
                    <input name="lastname" placeholder="Last Name" required type="text"/>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" placeholder="Email" type="email" required/>
        </div>
        <div class="field">
            <label for="username">Username</label>
            <input id="username" name="username" placeholder="Username" required/>
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password"
                   required/>
        </div>
        <div class="field">
            <button class="mg fluid button primary" id="register">Register</button>
        </div>
        `;
    }

    validate() {
        let formData = this.getValue();
        let errors = [];
        if(formData['username'].length < 4) {
            errors.push("Username should be more than 4 characters.")
        }
        if(formData['password'].trim().length < 8){

        }
    }

    success() {
        super.success();
        window.setTimeout(() => {
            window.location.href = "login.html";
        }, 1000)
    }
}
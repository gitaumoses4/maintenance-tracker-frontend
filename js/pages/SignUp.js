import SignUpForm from "../components/SignUpForm.js";
import {Login} from "./Login.js";
import PasswordField from "../components/PasswordField.js";
import ConfirmPasswordField from "../components/ConfirmPasswordField.js";

export class SignUp extends Login {
    constructor() {
        super();
    }

    /**
     * Render the form
     * @returns {string}
     */
    getForm() {
        return `
       <form class="mg form" id="signUpForm" method="post"
              enctype="multipart/form-data">
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
                <div class="field" id="password_field">
                    <label for="password">Password</label>
                    <ul class="error"> </ul>
                    <input id="password" name="password" type="password" placeholder="Password" required/>
                </div>
                <div class="field" id="confirm_password_field">
                    <label for="confirm_password">Confirm Password</label>
                    <ul class="error"></ul>
                    <input id="confirm_password" type="password" placeholder="Confirm Password" required/>
                </div>
                <div class="field">
                    <button class="mg fluid button primary" id="register">Register</button>
                </div>
        </form>`
    }

    getFormTitle() {
        return "Sign Up"
    }

    getFormFooter() {
        return ` <p>Already have an account?</p>
                <a href="login.html">Login</a>`
    }

    registerComponents() {
        new SignUpForm("signUpForm");
        new ConfirmPasswordField("confirm_password_field", document.getElementById("register"), "password_field");
        new PasswordField("password_field", document.getElementById("register"));
    }
}

new SignUp();
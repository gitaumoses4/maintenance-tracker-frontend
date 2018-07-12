import {Login} from "./Login.js";
import AccountActivationForm from "../components/AccountActivationForm.js";

export class AccountVerification extends Login {
    constructor() {
        super();
    }

    getFormTitle() {
        return "Account Verification";
    }

    /**
     * Render the form
     * @returns {string}
     */
    getForm() {
        return `
        <div class="mg segment info">
            <ul>
                <li>An verification PIN has been sent to your email. Use it to activate your account.</li>
            </ul>
        </div>
        <form class="mg form" method="post" enctype="multipart/form-data"
              id="verificationForm" style="margin-top: 2em;">
            <div class="status">
                <div class="mg segment error">
                </div>
                <div class="mg segment success">
                    <ul>
                        <li>Account verification successful</li>
                    </ul>
                </div>
            </div>
            <div class="field">
                <label for="pin">Verification PIN</label>
                <input id="pin" name="pin" required placeholder="6 Digit PIN"/>
            </div>
            <div class="field">
                <button class="mg fluid button primary">Submit</button>
            </div>
        </form>`;
    }
    registerComponents(){
        new AccountActivationForm("verificationForm")
    }
}

new AccountVerification();
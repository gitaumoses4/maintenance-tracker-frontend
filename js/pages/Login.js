import App from "./App.js";
import LoginForm from "../components/LoginForm.js";

export class Login extends App {
    /**
     *
     */
    constructor() {
        super();
    }

    /**
     *
     * @returns {string}
     */
    navBarMenu() {
        return `
             <div class="item right aligned">
                <i class="fas fa-phone"></i>
                <span class="padded left">+254705045048</span>
            </div>`
    }

    /**
     *
     * @returns {string}
     */
    getForm() {
        return `
       <form class="mg form" method="post" enctype="multipart/form-data"
              id="loginForm">
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
        </form>`;
    }

    /**
     *
     * @returns {string}
     */
    getFormTitle(){
        return "Log in";
    }

    /**
     *
     * @returns {string}
     */
    content() {
        return `
        <div class="mg container">
            <div class="center aligned">
                <h2>${ this.getFormTitle() }</h2>
            </div>
            <div class="mg row">
                <div class="mg six-large eight-medium twelve-small column center">
                    <div class="mg segment">
                        <div class="content">
                            ${ this.getForm() }             
                        </div>
                    </div>
                </div>
            </div>
            <div class="center aligned">
                   ${ this.getFormFooter() } 
            </div>
        </div>`
    }

    /**
     *
     * @returns {string}
     */
    getFormFooter() {
        return `<p>Don't have an account?</p>
                <a href="register.html">Sign up</a>`
    }

    /**
     *
     */
    registerComponents() {
        new LoginForm("loginForm");
    }
}

new Login();
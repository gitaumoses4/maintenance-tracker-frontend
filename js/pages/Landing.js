import App from "./App.js"

export class Landing extends App {

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
                <a href="login.html">Login</a>
            </div>`
    }

    /**
     *
     * @returns {string}
     */
    content() {
        return `<h1 class="landing header">The best way to reach out to our operations and repairs department.</h1>
                <h2 class="landing sub header">Easily manage your repairs and maintenance</h2>
        
                <div class="mg row">
                    <a href="register.html" class="mg center landing button">GET STARTED</a>
                </div>`;
    }

    /**
     *
     */
    onRender() {
        this.element.querySelector(".mg.content").classList.add("landing");
    }
}

const landing = new Landing();
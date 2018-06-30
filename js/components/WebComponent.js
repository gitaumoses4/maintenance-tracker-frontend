import Component from "./Component.js";

export default class WebComponent extends Component {
    constructor(id, method, url, headers) {
        super(id);
        this.method = method;
        this.headers = headers;
        this.link = url;
    }

    onDOMLoaded() {
        this.element.innerHTML = this.render();
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    setURL(url) {
        this.link = url;
    }

    load(body) {
        if (!this.element) {
            return;
        }
        let that = this;
        let fet;
        this.state = 1;
        this.loading();
        if (this.method.toLowerCase() === 'get') {
            fet = fetch(this.link, {
                method: that.method,
                headers: that.headers
            })
        } else {
            fet = fetch(this.link, {
                method: that.method,
                headers: that.headers,
                body: JSON.stringify(body)
            });
        }
        window.setTimeout(function () {
            fet.then(response => response.json())
                .then(data => {
                    that.data = data;
                    that.state = 2;
                    that.success();
                }).catch(error => {
                that.state = 3;
                that.error();
            })
        }, 2000);
    }

    loading() {
        this.element.classList.add("loading")
    }

    error() {
        this.element.classList.remove("loading");
    }

    success() {
        this.element.classList.remove("loading")

    }

    render() {

    }
}
import Component from "./Component.js";

export default class WebComponent extends Component {
    constructor(id, method, url, headers) {
        super(id);
        this.method = method;
        this.headers = headers;
        this.link = url;
    }

    loadPage(page) {
        let url = new URL(this.link);
        url.searchParams.set("page", page);
        this.link = url.href;
        this.load();
    }

    onDOMLoaded() {
        this.element.innerHTML = this.render();
        this.onRender();
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
            fet.then(response => {
                that.statusCode = response.status;
                return response.json()
            })
                .then(data => {
                    that.data = data;
                    that.state = 2;
                    if (data.status === "success") {
                        that.success();
                    } else {
                        that.error();
                    }
                }).catch(error => {
                that.state = 3;
                that.error();
            })
        }, 0);
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
}
import Component from "./Component.js";

/**
 * A web component.
 *
 * Basically a custom component that fetches data from an API
 *
 * It then renders depending on the API response.
 */
export default class WebComponent extends Component {
    constructor(id, method, url, headers) {
        super(id);
        this.method = method;
        this.headers = headers;
        this.link = url;
    }


    /**
     * Loads a different page from the API
     * @param page
     */
    loadPage(page) {
        let url = new URL(this.link);
        url.searchParams.set("page", page);
        this.link = url.href;
        this.load();
    }

    onDOMLoaded() {
        this.element.innerHTML = this.render() || this.element.innerHTML;
        this.onRender();
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    setURL(url) {
        this.link = url;
    }


    /**
     * Loads data from the API
     *
     * @param body
     */
    load(body) {
        if (!this.element) {
            return;
        }
        let that = this;
        let fet;
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
        fet.then(response => {
            that.statusCode = response.status;
            return response.json()
        })
            .then(data => {
                that.data = data;
                if (data.status === "success") {
                    that.success();
                } else {
                    that.error();
                }
            }).catch(error => {
            that.error();
        })
    }

    /**
     * Displays when the component is loading data
     */
    loading() {
        this.element.classList.add("loading")
    }

    /**
     * Displays when the API responds with an error message
     */
    error() {
        this.element.classList.remove("loading");
    }


    /**
     * Displays when the API responds with a success message
     */
    success() {
        this.element.classList.remove("loading")
    }
}
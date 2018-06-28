class Component {
    constructor(id, data = null) {
        let that = this;
        document.addEventListener("DOMContentLoaded", new function () {
            that.element = document.getElementById(id);
            if (that.element) {
                that.element.innerHTML = that.render();
            }
            if (data) {
                that.setData(data);
            }
            that.onDOMLoaded();
        });
    }

    onDOMLoaded() {

    }

    setData(data) {
        this.data = data;
        if (this.element) {
            this.element.innerHTML = this.render();
        }
        return this;
    }


    render() {
    }
}

class WebComponent extends Component {
    constructor(id, method, url, headers) {
        super(id);
        this.method = method;
        this.headers = headers;
        this.link = url;
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
        fet.then(response => response.json())
            .then(data => {
                that.data = data;
                that.state = 2;
                that.success();
            }).catch(error => {
            that.state = 3;
            that.error();
        })
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

class FormComponent extends WebComponent {

    constructor(id, method, url, headers) {
        super(id, method, url, headers);
    }

    onDOMLoaded() {
        this.element.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submit();
        })
    }

    submit() {
        let formData = new FormData(this.element);
        let object = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });

        this.load(object);
    }

    loading() {
        this.element.classList.add("loading");
    }

    success() {
        this.element.classList.remove("loading");
        let data = this.data;

        if (data.status === "error") {
            this.element.classList.add("error");
            this.element.classList.remove("success");

            let errorPanel = this.element.querySelector(".error");

            if (errorPanel) {
                errorPanel.style.display = '';
                errorPanel.innerHTML = `
					<ul>
						${data.message.map(info => `<li>${info}</li>`)}
					</ul>
				`;
            }
        } else {
            this.element.classList.add("success");
            this.element.classList.remove("error");
        }
    }
}

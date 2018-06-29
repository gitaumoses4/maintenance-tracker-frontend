export default class Component {
    constructor(id, data = null) {
        this.events = {};
        if ((typeof id).toLowerCase() === "string") {
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
        } else {
            if (id) {
                this.element = id;
                this.element.innerHTML = this.render();
                if (data) {
                    this.setData(data);
                }
                this.onDOMLoaded()
            }
        }

    }

    onDOMLoaded() {
        Object.keys(this.events).forEach((key) => {
            this.element.addEventListener(key, this.events[key]);
        })
    }

    addEventListener(event, eventListener) {
        this.events[event] = eventListener;
    }

    setData(data) {
        this.data = data;
        if (this.element) {
            this.element.innerHTML = this.render();
        }
        return this;
    }

    getHTML() {
        return this.element ? this.element.outerHTML : "";
    }


    render() {
    }
}
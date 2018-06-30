export default class Component {
    constructor(id, data = null) {
        if ((typeof id).toLowerCase() === "string") {
            let that = this;
            document.addEventListener("DOMContentLoaded", new function () {
                that.element = document.getElementById(id);
                if (data) {
                    that.setData(data);
                }
                that.onDOMLoaded();
            });
        } else {
            if (id) {
                this.element = id;
                if (data) {
                    this.setData(data);
                }
                this.onDOMLoaded()
            }
        }

    }

    onDOMLoaded() {
    }

    setData(data) {
        this.data = data;
        if (this.element && data) {
            this.element.innerHTML = this.render();
            this.onRender();
        }
        return this;
    }

    render() {
    }

    onRender(){

    }
}
export default class Component {
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
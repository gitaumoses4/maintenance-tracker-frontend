/**
 * This is a basic custom web component.
 *
 * Using Object Oriented Programming, the component can be rendered with specific data during or after the DOM has been created
 */
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

    /**
     * Invoked when the DOM has been created.
     *
     * Override this method in order to perform a task when the DOM has been loaded.
     */
    onDOMLoaded() {
    }


    /**
     * Sets the data to the component
     * @param data
     * @returns {Component}
     */
    setData(data) {
        this.data = data;
        if (this.element && data) {
            let content = this.render();
            if (content) {
                this.element.innerHTML = content;
            }
            this.onRender();
        }
        return this;
    }


    /**
     * Renders the inner html fo the component
     * @returns {string}
     */
    render() {
        return '';
    }


    /**
     * Invoked when the component has been rendered
     */
    onRender() {

    }
}
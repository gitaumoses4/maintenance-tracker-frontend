import Component from "../components/Component.js";

/**
 * Renders a full page for the User Interface
 */
export default class App extends Component {
    constructor() {
        super(document.body.id === "testing" ? document.getElementById("test")
            : document.body, {});
    }


    /**
     * A component that displays the navigation bar menu
     * @returns {string}
     */
    navBarMenu() {
        return ``;
    }

    /**
     * Return the index of the current selected sidebar item
     * @returns {number}
     */
    getSidebarActiveItem() {
        return 0;
    }


    /**
     * Return the side bar items
     * @returns {Array}
     */
    getSideBarMenuItems() {
        return []
    }


    /**
     * Render the sidebar menu
     * @returns {string}
     */
    sideBarMenu() {
        let items = this.getSideBarMenuItems();
        if (items.length === 0) {
            return "";
        } else {
            let menu = document.createElement("div");
            menu.classList.add("menu");
            items.map((item, index) => {
                let menuItem = document.createElement("a");
                menuItem.classList.add("item");
                if (index === this.getSidebarActiveItem()) {
                    menuItem.classList.add("active");
                }
                if (item.hasOwnProperty("href")) {
                    menuItem.setAttribute("href", item.href);
                }
                if (item.hasOwnProperty("id")) {
                    menuItem.id = item.id;
                }
                menuItem.innerHTML = `
                    <i class="icon fas ${ item.icon }"></i>
                    <div class="title center aligned">
                        <div class="title">${ item.title }</div>
                    </div>`;
                menu.appendChild(menuItem);
            });
            return menu.outerHTML;
        }
    }

    /**
     * Checks if this page has a sidebar
     * @returns {boolean}
     */
    hasSideBar() {
        return this.getSideBarMenuItems().length !== 0;
    }


    /**
     * Returns the sidebar for this page
     * @returns {string}
     */
    getSideBar() {
        return `<div class="mg sidebar" data-trigger="openSidebar">
                        ${ this.sideBarMenu() }
                </div>`
    }


    /**
     * Renders the navbar for the page
     * @returns {string}
     */
    navBar() {
        return `<div class="mg navbar">
                    ${ this.hasSideBar() ? ` <i class="open fas fa-bars" id="openSidebar"></i>` : ""}
                    <div class="header ${ this.hasSideBar() ? `` : "padded" } left">${ this.getTitle() }</div>
                    <div class="menu">
                        ${ this.navBarMenu() } 
                    </div>
                </div>`
    }

    /**
     * Renders the content of the page
     */
    content() {
        return '';
    }

    /**
     * The page title displayed on the navbar
     * @returns {string}
     */
    getTitle() {
        return "Maintenance Tracker";
    }

    /**
     * REnder the page content
     * @returns {string}
     */
    render() {
        return `
            ${ this.hasSideBar() ? this.getSideBar() : ""}
            <div class="mg pushable">
                ${ this.navBar() }
                <div class="mg content">
                    ${ this.content() }
                </div>
            </div> 
        `;
    }

    /**
     * Override this method to register components
     */
    onRender() {
        if (this.sideBarMenu()) {
            initSidebar(this.element.querySelector(".mg.sidebar"))
        }
        this.registerComponents();
    }

    /**
     * Override this method to register components
     */
    registerComponents() {

    }
}
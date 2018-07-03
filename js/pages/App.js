import Component from "../components/Component.js";

export default class App extends Component {
    constructor() {
        super(document.body, {});
    }

    navBarMenu() {
        return ``;
    }

    getSidebarActiveItem() {
        return 0;
    }

    getSideBarMenuItems() {
        return []
    }

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

    hasSideBar() {
        return this.getSideBarMenuItems().length !== 0;
    }

    getSideBar() {
        return `<div class="mg sidebar" data-trigger="openSidebar">
                        ${ this.sideBarMenu() }
                </div>`
    }

    navBar() {
        return `<div class="mg navbar">
                    ${ this.hasSideBar() ? ` <i class="open fas fa-bars" id="openSidebar"></i>` : ""}
                    <div class="header ${ this.hasSideBar() ? `` : "padded" } left">${ this.getTitle() }</div>
                    <div class="menu">
                        ${ this.navBarMenu() } 
                    </div>
                </div>`
    }

    content() {

    }

    getTitle() {
        return "Maintenance Tracker";
    }

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

    onRender() {
        if (this.sideBarMenu()) {
            initSidebar(this.element.querySelector(".mg.sidebar"))
        }
        this.registerComponents();
    }

    registerComponents() {

    }
}
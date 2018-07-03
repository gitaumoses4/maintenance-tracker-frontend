import Component from "../components/Component.js";

export default class App extends Component {
    constructor() {
        super(document.body, {});
    }

    navBarMenu() {
        return ``;
    }

    sideBarMenu() {
        return ``;
    }

    getSideBar() {
        return `<div class="mg sidebar" data-trigger="openSidebar">
                    <div class="menu">
                        ${ this.sideBarMenu() }
                    </div>               
                </div>`
    }

    navBar() {
        return `<div class="mg navbar">
                    ${ this.sideBarMenu() ? ` <i class="open fas fa-bars" id="openSidebar"></i>` : ""}
                    <div class="header padded left">${ this.getTitle() }</div>
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
            ${ this.sideBarMenu() ? this.getSideBar() : ""}
            <div class="mg pushable">
                ${ this.navBar() }
                <div class="mg content">
                    ${ this.content() }
                </div>
            </div> 
        `;
    }
}
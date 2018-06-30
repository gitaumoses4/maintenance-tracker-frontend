import Component from "./Component.js";

export default class UserOptions extends Component {
    constructor(id) {
        super(id, getUser());
    }

    render() {
        let data = this.data;
        return `
            <div class="trigger">
                <div class="account-options" id="user-name">
                    <div class="title">${ data.firstname } ${ data.lastname }</div>
                    <img src="../images/user-male.png" class="mg tiny image"/>
                </div>
            </div>
            <div class="menu" style="width: 100%">
                <a class="item" onclick="logout()">Logout <i class="fas fa-sign-out-alt"></i></a>
            </div>`;
    }

    onRender(){
        initDropdown(this.element)
    }
}
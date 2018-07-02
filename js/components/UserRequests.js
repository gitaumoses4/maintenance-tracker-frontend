import WebComponent from "./WebComponent.js";
import Paginator from "./Paginator.js";

export default class UserRequests extends WebComponent {
    constructor(id, type = "all") {
        super(id, "GET", API_BASE_URL + (isAdmin() ? "/requests/" : "/users/requests/") + type, getAuthHeaders());
        this.type = type;
    }



    static empty() {
        return `
        <div class="mg container">
            <div class="mg segment">
                <div class="header">
                    No maintenance/repair requests 
                </div>
                <div class="content empty">
                   There are no any maintenance/repair requests 
                   <br>
                   <i class="fas fa-cogs"></i>
                </div>
            </div>
        </div>
        `
    }

    static renderRequest(request) {
        return `
        <div class="three-large twelve-small four-medium column">
            <div class="mg card ribbon fluid">
                <div class="${ request.status.toLowerCase()} ribbon">
                    <div class="content">${ request.status }</div>
                </div>
                <div class="image">
                    <img src="${ request.photo || '../images/placeholder.png' }"/>
                </div>
                <div class="content">
                    <div class="title">
                        ${ request.product_name }
                    </div>
                    <div class="description">
                        ${ request.description }
                    </div>
                    <div class="mg vertical divider"></div>
                    <div class="meta">
                        <a href="request.html?id=${ request.id }">View...</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    loading() {
        super.loading();
        this.element.classList.add("dark");
    }

    success() {
        super.success();
        this.element.innerHTML = this.data.data.requests.length === 0 ? UserRequests.empty() : `
            <div class="mg row" style="margin-bottom: 2em;">
                <div class="mg paginator center" id="user-requests-paginator">
                </div>
            </div>
            <div class="mg row" id="main-requests">
               ${ this.data.data.requests.map(request => UserRequests.renderRequest(request)).join("")} 
            </div>
        `;
        let paginator = new Paginator(this.element.querySelector("#user-requests-paginator"), this.data.data.current_page, this.data.data.last_page);
        let that = this;
        paginator.setOnPageChangeListener(function (page) {
            that.loadPage(page);
        })
    }
}
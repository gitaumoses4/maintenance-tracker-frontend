import LatestRequests from "./LatestRequests.js";
import Paginator from "./Paginator.js";

export default class AdminRequests extends LatestRequests {

    constructor(id, status) {
        super(id, status);
    }

    loadPage(page) {
        let url = new URL(this.link);
        url.searchParams.set("page", page);
        this.link = url.href;
        this.load();
    }

    render() {
        return `
            <button class="mg button right aligned" id="filter"><i class="fas fa-filter"></i> Filter</button>
            <div class="mg row">
                <div class="mg paginator center" id="admin-requests-paginator-top"></div>
            </div>
            <div class="content"></div>
            <div class="mg row">
                <div class="mg paginator center" id="admin-requests-paginator"></div>
            </div>
        `
    }

    success() {
        super.success();
        this.paginator.update(this.data.data.current_page, this.data.data.last_page);
        this.paginatorTop.update(this.paginator.currentPage, this.paginator.numPages);
    }


    onRender() {
        this.paginator = new Paginator(this.element.querySelector("#admin-requests-paginator"), 1, 1);
        this.paginatorTop = new Paginator(this.element.querySelector("#admin-requests-paginator-top"), 1, 1);
        let that = this;

        this.paginatorTop.setOnPageChangeListener(function (page) {
            that.loadPage(page);
            that.paginator.update(page, that.paginatorTop.numPages);
        });
        this.paginator.setOnPageChangeListener(function (page) {
            that.loadPage(page);
            that.paginatorTop.update(page, that.paginator.numPages);
        })
    }
}
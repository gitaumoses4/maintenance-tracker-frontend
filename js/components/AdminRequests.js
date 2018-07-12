import LatestRequests from "./LatestRequests.js";
import Paginator from "./Paginator.js";
import RequestsFilter from "./RequestsFilter.js";


/**
 * Displays a paginated result of all the maintenance/repair requests
 */
export default class AdminRequests extends LatestRequests {

    constructor(id, status) {
        super(id, status);
    }

    /**
     * Load the next page
     * @param page
     */

    loadPage(page) {
        let url = new URL(this.link);
        url.searchParams.set("page", page);
        this.link = url.href;
        this.load();
    }

    /**
     * Filter the requests
     * @param from
     * @param to
     * @param query
     * @param status
     */
    filterRequests(from, to, query, status) {
        let url = new URL(API_BASE_URL + "/requests/" + status);
        url.searchParams.set("page", 1);
        if (from) {
            url.searchParams.set("from", from);
        }
        if (to) {
            url.searchParams.set("to", to);
        }
        if (query) {
            url.searchParams.set("query", query);
        }

        this.link = url.href;
        this.load();
    }


    /**
     * Render the requests component
     * @returns {string}
     */
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
            <div id="filter-modal"></div>
        `
    }

    /**
     * Create the paginator on successful loading of requests
     */
    success() {
        super.success();
        this.paginator.update(this.data.data.current_page, this.data.data.last_page);
        this.paginatorTop.update(this.paginator.currentPage, this.paginator.numPages);
    }


    /**
     * When the component is rendered create the listener for the paginator events
     */
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
        });

        this.filter = new RequestsFilter("filter-modal", "filter");
        this.filter.setOnFilterListener(function (from, to, query, status) {
            that.filterRequests(from, to, query, status);
        });
    }
}
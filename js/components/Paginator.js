import Component from "./Component.js";

export default class Paginator extends Component {

    constructor(id, currentPage, numPages, clickActive = false) {
        super(id);
        this.currentPage = currentPage;
        this.numPages = numPages;
        this.maxDisplayed = 5;
        this.clickActive = clickActive;
        this.render();
    }

    renderPage(pageIndex, currentPage = -100) {
        let page = document.createElement("div");
        page.classList.add("item");
        if (currentPage === pageIndex) {
            page.classList.add("active");
        }

        let that = this;
        if (currentPage !== pageIndex || this.clickActive) {
            page.addEventListener("click", function () {
                if (that.pageChangeListener) {
                    that.pageChangeListener.apply(that, [pageIndex]);
                }
            });
        }

        page.innerHTML = pageIndex;
        return page;
    }

    firstPage() {
        let page = this.renderPage(1);
        page.innerHTML = `<i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i>`;
        return page;
    }

    previousPage(previous) {
        let page = this.renderPage(previous);
        page.innerHTML = `<i class='fas fa-chevron-left'></i>`;
        return page;
    }

    nextPage(next) {
        let page = this.renderPage(next);
        page.innerHTML = `<i class='fas fa-chevron-right'></i>`;
        return page;
    }

    lastPage(last) {
        let page = this.renderPage(last);
        page.innerHTML = `<i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i>`;
        return page;
    }

    render() {
        let paginator = this.element;

        let pages = this.getStartAndEnd();
        if (this.currentPage !== 1) {
            paginator.appendChild(this.firstPage());
            paginator.appendChild(this.previousPage(this.currentPage - 1))
        }
        for (let i = pages[0]; i <= pages[1]; i++) {
            paginator.appendChild(this.renderPage(i, this.currentPage));
        }
        if (this.currentPage !== this.numPages) {
            paginator.appendChild(this.nextPage(this.currentPage + 1));
            paginator.appendChild(this.lastPage(this.numPages));
        }
    }

    getStartAndEnd() {
        let startPage = this.currentPage - this.maxDisplayed;
        let endPage = this.currentPage + this.maxDisplayed;

        startPage = startPage < 0 ? 1 : startPage + 1;
        endPage = endPage > this.numPages ? this.numPages : endPage - 1;

        let start = this.currentPage;
        let end = this.currentPage;

        let i = 1;
        while (i < this.maxDisplayed) {
            if (start > startPage) {
                start--;
                i++;
            }
            if (end < endPage) {
                end++;
                i++;
            }
        }

        return [start, end];
    }

    setOnPageChangeListener(pageChangeListener) {
        this.pageChangeListener = pageChangeListener;
    }
}
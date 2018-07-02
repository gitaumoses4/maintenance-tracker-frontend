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

    update(currentPage, numPages) {
        this.currentPage = currentPage;
        this.numPages = numPages;
        this.render();
    }

    renderPage(pageIndex) {
        let page = document.createElement("div");
        page.classList.add("item");
        if (this.currentPage === pageIndex) {
            page.classList.add("active");
        }

        let that = this;
        if (this.currentPage !== pageIndex || this.clickActive) {
            page.addEventListener("click", function () {
                if (that.pageChangeListener) {
                    that.update(pageIndex, that.numPages);
                    that.pageChangeListener.apply(that, [pageIndex]);
                }
            });
        }

        page.innerHTML = pageIndex;
        return page;
    }

    firstPage() {
        let page = this.renderPage(1);
        if (this.currentPage === 1) {
            page.classList.add("disabled");
        }
        page.innerHTML = `<i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i>`;
        return page;
    }

    previousPage() {
        let page = this.renderPage(this.currentPage - 1);
        if (this.currentPage === 1) {
            page.classList.add("disabled");
        }
        page.innerHTML = `<i class='fas fa-chevron-left'></i>`;
        return page;
    }

    nextPage() {
        let page = this.renderPage(this.currentPage + 1);
        if (this.currentPage === this.numPages) {
            page.classList.add("disabled");
        }
        page.innerHTML = `<i class='fas fa-chevron-right'></i>`;
        return page;
    }

    lastPage() {
        let page = this.renderPage(this.numPages);
        if (this.currentPage === this.numPages) {
            page.classList.add("disabled");
        }
        page.innerHTML = `<i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i>`;
        return page;
    }

    render() {
        if (this.numPages === 1 || this.currentPage > this.numPages) {
            this.element.style.display = "none";
        } else {
            this.element.style.display = '';
            this.element.innerHTML = '';
            let paginator = this.element;

            let pages = this.getStartAndEnd();
            paginator.appendChild(this.firstPage());
            paginator.appendChild(this.previousPage())
            for (let i = pages[0]; i <= pages[1]; i++) {
                paginator.appendChild(this.renderPage(i));
            }
            paginator.appendChild(this.nextPage());
            paginator.appendChild(this.lastPage());
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
            let pageFound = false;
            if (start > startPage) {
                start--;
                i++;
                pageFound = true;
            }
            if (end < endPage) {
                end++;
                i++;
                pageFound = true;
            }
            if (!pageFound) {
                break;
            }
        }

        return [start, end];
    }

    setOnPageChangeListener(pageChangeListener) {
        this.pageChangeListener = pageChangeListener;
    }
}
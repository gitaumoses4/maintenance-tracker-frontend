import Component from "./Component.js";

export default class RequestsFilter extends Component {
    constructor(id, trigger) {
        super(id, {"trigger": trigger});
    }

    render() {
        return `
                <div class="mg modal" data-trigger="${ this.data.trigger }">
                    <div class="body">
                        <i class="close icon fas fa-times"></i>
                        <div class="title">
                            Filter Requests
                        </div>
                        <div class="content">
                            <form action="" class="mg form" enctype="application/x-www-form-urlencoded" id="filterForm">
                                <div class="field">
                                    <label>Request Date</label>
                                    <div class="fields">
                                        <div class="six-large six-medium twelve-small field">
                                            <label>From</label>
                                            <input type="date" name="from">
                                        </div>
                                        <div class="six-large six-medium twelve-small field">
                                            <label>To</label>
                                            <input type="date" name="to"/>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label>Product Name</label>
                                        <input type="text" name="query" placeholder="Product Name"/>
                                    </div>
                                    <div class="field">
                                        <label>Repair/Maintenance Status</label>
                                        <select name="status">
                                            <option value="all">All Requests</option>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="disapproved">Disapproved</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="footer">
                            <button class="mg button">
                                Cancel
                            </button>
                            <button class="mg success button" id="submitFilterForm">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            `;
    }

    onRender() {
        initModal(this.element.querySelector(".mg.modal"));
        let form = this.element.querySelector("#filterForm");

        let that = this;
        this.element.querySelector("#submitFilterForm").addEventListener("click", function () {
            let formData = new  FormData(form);
            if(that.onFilterListener){
                that.onFilterListener.apply(this, [formData.get("from"), formData.get("to"), formData.get("query"), formData.get("status")]);
            }
        })
    }

    setOnFilterListener(onFilterListener){
        this.onFilterListener = onFilterListener;
    }
}
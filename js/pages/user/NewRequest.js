import {Dashboard} from "./Dashboard.js";
import NewMaintenanceRequest from "../../components/NewMaintenanceRequest.js";

export class NewRequest extends Dashboard {
    constructor() {
        super();
    }

    getSidebarActiveItem() {
        return -1;
    }


    getFormTitle() {
        return "New Maintenance/Repair Request";
    }

    mainContent() {
        return ` <div class="mg segment">
            <div class="header">
                ${ this.getFormTitle() } 
            </div>
            <div class="content">
                <div class="mg row">
                    <div class="six-large eight-medium twelve-small column center">
                        <form action="" class="mg form" method="post" enctype="multipart/form-data"
                              id="new-request-form">
                                <div class="status">
                                    <div class="mg segment error">
                                    </div>
                                    <div class="mg segment success">
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Photo</label>
                                    <div class="fields">
                                        <div class="four-large four-medium six-small field">
                                            <img src="../images/placeholder.png" class="mg image" id="product-photo-img"
                                                 style="width: 100%"/>
                                        </div>
                                        <div class="eight-large eight-medium six-small field">
                                            <label for="product-photo">Choose Photo
                                                <input type="file" size="10" id="product-photo" required
                                                       accept="image/png, image/jpeg"/>
                                                <input type="hidden" name="photo" id="product-photo-input">
                                            </label>
                                            <button class="mg danger button"
                                                    type="button" id="product-photo-remove">Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Product Name</label>
                                    <input type="text" name="product_name" id="new-request-product-name" required
                                           placeholder="Product Name"/>
                                </div>
                                <div class="field">
                                    <label>Description</label>
                                    <textarea rows="10" name="description" required id="new-request-description"></textarea>
                                </div>
                                <div class="field">
                                    <div class="fields">
                                        <div class="field">
                                            <button class="mg button" id="cancel-request" type="reset">Clear</button>
                                        </div>
                                        <div class="field">
                                            <button class="mg primary button" id="submit-request" type="button">Submit</button>
                                        </div>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
    }

    registerComponents() {
        new NewMaintenanceRequest("new-request-form");
    }
}

new NewRequest();
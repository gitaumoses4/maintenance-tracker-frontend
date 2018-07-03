import {NewRequest} from "./NewRequest.js";
import NewMaintenanceRequest from "../../components/NewMaintenanceRequest.js";

export class EditRequest extends NewRequest {
    constructor() {
        super();
    }


    registerComponents() {
        new NewMaintenanceRequest("new-request-form", true);
    }

    getFormTitle() {
        return "Edit Maintenance/Repair Request";
    }
}

new EditRequest();
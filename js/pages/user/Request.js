import {Dashboard} from "./Dashboard.js";
import UserRequest from "../../components/UserRequest.js";

export class Request extends Dashboard {
    constructor() {
        super();
    }

    mainContent() {
        return `<div id="user-request"> </div>`
    }

    registerComponents() {
        const userRequest = new UserRequest("user-request", getQueryParameter("id"));
        userRequest.load();
    }
}

new Request();
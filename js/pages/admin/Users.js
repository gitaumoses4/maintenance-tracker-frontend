import {AdminDashboard} from "./AdminDashboard.js";
import AllUsers from "../../components/AllUsers.js";

export class Users extends AdminDashboard{
   constructor(){
       super();
   }

   mainContent(){
      return `<div id="admin-view-all-users"> </div>`
   }

   registerComponents(){
      const allUsers = new AllUsers("admin-view-all-users");
      allUsers.load();
   }

   getSidebarActiveItem(){
      return 3;
   }
}

new Users();
import AccountService from "./account.service";
import DataService from "./data.service";


let mod = angular.module("app.services", []);

mod.service("AccountService", AccountService);
mod.service("DataService", DataService);

let name = mod.name;

export default name;
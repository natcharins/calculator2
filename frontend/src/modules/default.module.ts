import { routing as routeConfig} from "./default.route";
import LandingController from "./landing/landing.controller";

let _dependencies: Array<string> = [];
let mod = angular.module("app.default", _dependencies);

mod.controller("LandingController", LandingController);
mod.config(routeConfig);

let name = mod.name;

export default name;
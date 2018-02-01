import { ReadFile } from "./read-file.directive";
import { Loading } from "./loading/loading.directive";

let mod = angular.module("app.directives", []);

mod.directive("readFile", ReadFile);
mod.directive("loading", Loading.factory());

let name = mod.name;

export default name;
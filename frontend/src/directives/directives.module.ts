import { ReadFile } from "./read-file.directive";



let mod = angular.module("app.directives", []);

mod.directive("readFile", ReadFile);

let name = mod.name;

export default name;
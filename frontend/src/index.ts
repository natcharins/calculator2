
import DefaultModule from "./modules/default.module";
import DirectivesModule from "./directives/directives.module";
import ServicesModule from "./services/services.module";

import "./scss/app.scss"

import generateConstant from "./constant";
import {routeChangeEvents} from "./routeChangeEvents";
import * as commonLib from "../common.lib";

let _dependencies: Array<string> = [
    "ui.router",
    DefaultModule,
    DirectivesModule,
    ServicesModule
];

(function () {
    function getAppConfig() {
        let initInjector = angular.injector(["ng"]);
        let $http = initInjector.get("$http");

        // Read application config from external json file
        return $http.get(commonLib.getConfigPath).then((response) => {
            let constant = generateConstant(response.data);

            // Init angular app after got config
            angular.module("app", _dependencies)
                .constant("constant", constant)
                .run(routeChangeEvents);
        }, () => {
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ["app"]);
        });
    }

    getAppConfig().then(bootstrapApplication);
})();
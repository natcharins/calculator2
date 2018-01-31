routing.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

export function routing($stateProvider: any, $urlRouterProvider: any, $locationProvider: ng.ILocationProvider) {

    let defaultState: any = {
        name: "landing",
        url: "/",
        templateUrl: "src/modules/landing/landing.html",
        controller: "LandingController",
        controllerAs: "vm",
    };

    $urlRouterProvider.otherwise("/");

    $stateProvider.state(defaultState);

}

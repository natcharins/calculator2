routeChangeEvents.$inject = ["$transitions", "$window"];

export function routeChangeEvents($transitions: any, $window: ng.IWindowService) {

    $transitions.onStart({}, ($transition) => {
        
    });
}

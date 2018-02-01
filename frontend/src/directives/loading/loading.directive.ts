interface IRootScopeService extends ng.IRootScopeService {
	spinner: boolean;
}

interface IScope extends ng.IScope {
	isLoading: () => boolean;
}

export class Loading implements ng.IDirective {
	static $inject: Array<string> = [];
	constructor(public $http: ng.IHttpService, public $rootScope: IRootScopeService) { };
	public restrict: string = "E";
	public replace: boolean = true;
	public templateUrl: string = "src/directives/loading/loading.directive.html";
	public link: ng.IDirectiveLinkFn = (scope: IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {
		this.$rootScope.spinner = false;
		scope.isLoading = () => {
            return this.$http.pendingRequests.length > 0;
		};
		scope.$watch(scope.isLoading, (loading : boolean) => {
            this.$rootScope.spinnerActive = loading;

            if (loading) {
                elem.removeClass("ng-hide");
            } else {
                elem.addClass("ng-hide");
            }
        });
	}

	static factory(): ng.IDirectiveFactory {
        let directive: ng.IDirectiveFactory = ( $http: ng.IHttpService, 
                                                $rootScope: IRootScopeService) => new Loading($http, $rootScope); 
        directive.$inject = ["$http", "$rootScope"];
        return directive;
    }
}
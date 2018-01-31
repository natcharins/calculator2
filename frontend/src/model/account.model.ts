export class Account {

	public id: number;
	public name: string;
	
	constructor(object?: Account) {
        if (angular.isDefined(object)) {
            for (let attributeName in object) {
                if (object.hasOwnProperty(attributeName)
                    && angular.isDefined(object[attributeName])) {
                    this[attributeName] = object[attributeName];
                }
            }
        }
    }
}
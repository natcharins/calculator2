export class Calculator {

	public input: Array<number>;
	public operator: string;
	public result: number;
	
	constructor(object?: Calculator) {
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
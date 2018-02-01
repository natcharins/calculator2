import { Calculator } from "./calculator.model";

export class File {

	public id: number;
	public filename: string;
    public ownerId: number;
    public data: Calculator;
	
	constructor(object?: File) {
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
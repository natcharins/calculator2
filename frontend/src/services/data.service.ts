import { File } from "../model/data.model";

export default class DataService {

	static $inject: Array<string> = ["$http", "$q", "constant"];

	private _getAllData: string;
	private _createData: string;
	private _updateData: string;

	constructor(private $http: ng.IHttpService, private $q: ng.IQService, private constant: any) {

		this._getAllData = this.constant.restUrl + "/api/data";
		this._createData = this.constant.restUrl + "/api/data";
		this._updateData = this.constant.restUrl + "/api/data/update";

	}

	public getAllData(ownerId: number) {
		return this.$http.get(this._getAllData, {params: {id: ownerId}}).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}

	public createData(data: File) {
		return this.$http.post(this._createData, data).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}

	public updateData(data: File) {
		return this.$http.post(this._updateData, data).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}
}
import { Account } from "../model/account.model";

export default class AccountService {

	static $inject: Array<string> = ["$http", "$q", "constant"];

	private _getAllAccounts: string;
	private _createAccount: string;
	private _updateAccount: string;

	constructor(private $http: ng.IHttpService, private $q: ng.IQService, private constant: any) {

		this._getAllAccounts = this.constant.restUrl + "/api/accounts";
		this._createAccount = this.constant.restUrl + "/api/account";
		this._updateAccount = this.constant.restUrl + "/api/account/update";

	}

	public getAllAccount() {
		return this.$http.get(this._getAllAccounts).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}

	public createAccount(data: Account) {
		return this.$http.post(this._createAccount, data).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}

	public updateAccount(data: Account) {
		return this.$http.post(this._updateAccount, data).then((response: any) => {
			return this.$q.when(response.data);
		}, (reason: any) => {
			return this.$q.reject(reason.data);
		});
	}
}
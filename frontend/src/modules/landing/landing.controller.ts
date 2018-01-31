
import { Calculator } from "../../model/calculator.model";
import { Account } from "../../model/account.model";
import { File } from "../../model/data.model";
import AccountService from "../../services/account.service";
import DataService from "../../services/data.service";

export default class LandingController {
    static $inject: Array<string> = ["AccountService", "DataService"];

    public data: Calculator;
    public account: Account;
    public accounts: Array<Account>;
    public file: File;
    public files: Array<File>;
    public input = new Array(2);
    public googleCloud: boolean = false;
    public method: string;

    private ownerId: number;

    constructor(private accountService: AccountService, private dataService: DataService) {
        this.data = new Calculator();
        this.getAllAccounts();
    }

    // Calculator

    public checkOperator(current: string) {
        return this.data.operator === current ? 'is-active' : 'is-outlined'
    }

    public cal() {
        switch (this.data.operator) {
            case "plus":
                this.data.result = this.input[0] + this.input[1];
                break;
            case "minus":
                this.data.result = this.input[0] - this.input[1];
                break;
            case "multiply":
                this.data.result = this.input[0] * this.input[1];
                break;
            case "divide":
                this.data.result = this.input[0] / this.input[1];
                break;
            case "multiply":
                this.data.result = Math.pow(this.input[0], this.input[1]);
                break;
            default:
                this.data.result = NaN;
        }

    }

    // Check State

    public checkSave() {
        if (isNaN(this.data.result)) { return this.error(); }
        this.method = "save";
        return this.googleCloud ? this.openAccountList() : this.saveLocal();
    }

    public checkLoad() {
        this.method = "load";
        return this.googleCloud ? this.openAccountList() : this.loadLocal();
    }

    public checkMethod(id: number) {
        this.ownerId = id;
        this.method === "save" ? this.openModal("#newFileModal") : this.getFilesByAccount();
    }

    // Close Modal

    public cancel(name: string) {
        angular.element(name).removeClass("is-active");
    }

    // Account

    public createNewAccount() {
        this.accountService.createAccount(this.account).then((response: Account) => {
            this.updateAccount(response);
            this.cancel('#newAccountModal');
        }, () => { })
    }

    private updateAccount(data: Account) {
        this.accountService.updateAccount(data).then((response: Account) => {
            this.accounts.push(response);
        }, () => { })
    }

    public openAccountForm() {
        this.openModal("#newAccountModal");
    }

    // Save-Load File

    private saveLocal() {
        let data = angular.extend(this.data, { "input": this.input });
        data = JSON.stringify(data);

        let blob = new Blob([data], { type: 'text/json' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, "calcalation.json");
        }
        else {
            var e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = "calcalation.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
        }
    }

    private loadLocal() {
        angular.element("#file").trigger("click");
    }

    private saveCloud() {
        let file = new File();
        let data = angular.extend(this.data, { "input": this.input });
        file.filename = this.file.filename;
        file.ownerId = this.ownerId;
        file.data = data;
        this.dataService.createData(file).then((response: File) => {
            this.updateFile(response);
            this.data = new Calculator();
            this.input = new Array(2);
            this.file = new File();
            this.cancel("#newFileModal");
            this.cancel("#accountModal");
        }, () => { });
    }

    private loadCloud(file: File) {
        this.data = file.data;
        this.input = file.data.input;
        this.cancel("#loadFileModal");
        this.cancel("#accountModal");
    }

    private updateFile(file: File) {
        this.dataService.updateData(file).then((response: File) => {
            this.files.push(response);
        }, () => { })
    }

    // Modal

    private openModal(name: string) {
        return angular.element(name).addClass("is-active");
    }

    private openAccountList() {
        this.openModal("#accountModal");
    }

    private error() {
        this.openModal("#errorModal");
    }

    // Get All data

    private getAllAccounts() {
        this.accountService.getAllAccount().then((response: Array<Account>) => {
            this.accounts = response;
        }, () => { })
    }

    private getFilesByAccount() {
        this.dataService.getAllData(this.ownerId).then((response: Array<File>) => {
            this.files = response;
            this.openModal("#loadFileModal");
        }, () => { });
    }


}
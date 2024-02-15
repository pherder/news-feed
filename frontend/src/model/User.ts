export class User {
    private _username: string;
    private _token: string;

    constructor(username: string, token: string) {
        this._username = username;
        this._token = token;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }
}
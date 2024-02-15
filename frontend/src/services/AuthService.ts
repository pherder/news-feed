import {User} from "../model/User";
import ApiClient from "../client/ApiClient";

class AuthService {
    private STORAGE_USER_KEY: string = 'userAuth';

    constructor() {
        const user: User = this.getAuthenticatedUser();

        if (user) {
            ApiClient.setBearerToken(user.token);
        }
    }

    getAuthenticatedUser(): User | null {
        const stored: string = localStorage.getItem(this.STORAGE_USER_KEY);
        if (stored) {
            const auth = JSON.parse(stored);
            return new User(auth._username, auth._token);
        }

        return null;
    }

    async register(name: string, email: string, password: string): Promise<User> {
        const response = await ApiClient.register(name, email, password);

        const user: User = new User(response.data.data.name, response.data.access_token);
        localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(user));
        ApiClient.setBearerToken(user.token);

        return user;
    }

    async login(email: string, password: string): Promise<User> {
        const response = await ApiClient.login(email, password);

        const user: User = new User(response.data.name, response.data.access_token);
        localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(user));
        ApiClient.setBearerToken(user.token);

        return user;
    }

    logout(): void {
        localStorage.removeItem(this.STORAGE_USER_KEY);
        ApiClient.clearBearerToken();
    }
}

export default new AuthService();
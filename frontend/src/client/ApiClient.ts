import axios, {AxiosInstance} from "axios";

export interface Article {
    id: number;
    title: string;
    content: string;
    original_date: string;
    created_at: string;
    updated_at: string;
    categories: Category[];
    source: Source;
    authors: Author[];
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        article_id: number;
        category_id: number;
    };
}

export interface Source {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Author {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        article_id: number;
        author_id: number;
    };
}

class ApiClient {
    private axios: AxiosInstance;
    private bearerToken: string | null;

    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:88/api'
        });

        this.axios.interceptors.request.use((config) => {
            if (this.bearerToken) {
                config.headers['Authorization'] = `Bearer ${this.bearerToken}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    setBearerToken(token: string): void {
        this.bearerToken = token;
    }

    clearBearerToken(): void {
        this.bearerToken = null;
    }

    async login(email, password): Promise<any> {
        return await this.axios.post('/login', {
            email: email,
            password: password
        });
    }

    async register(name, email, password): Promise<any> {
        return await this.axios.post('/register', {
            name: name,
            email: email,
            password: password
        });
    }

    async getArticles(filters): Promise<Article[]> {
        const params = new URLSearchParams();

        if (filters.keyword) {
            params.append('keyword', filters.keyword);
        }
        if (filters.publishedDate) {
            params.append('publishedDate', filters.publishedDate);
        }

        const response = await this.axios.get(`/articles?${params.toString()}`);

        return response.data;
    }

    async getAvailableFeedSettings() {
        const response = await this.axios.get('/user/feed-settings/available')

        return response.data;
    }

    async getUserFeedSettings() {
        const response = await this.axios.get('/user/feed-settings')

        return response.data;
    }

    async setUserFeedSettings(settings): Promise<void> {
        await this.axios.post('/user/feed-settings', {
            data: settings
        })
    }
}

export default new ApiClient();
import { trimEnd, trimStart } from 'lodash';
import { config } from '../config';
import { authService } from './auth-service';
import { UserStorage } from './user-storage-service';

export class HttpError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}

interface RequestOptions {
    body?: unknown;
}

class HttpService {
    private userStorage = new UserStorage();

    constructor(private baseUrl: string) {}

    async get<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('GET', path, options);
    }

    async post<T>(path: string, options: RequestOptions) {
        return this.request<T>('POST', path, options);
    }

    async put<T>(path: string, options: RequestOptions) {
        return this.request<T>('PUT', path, options);
    }

    async delete<T>(path: string, options: RequestOptions) {
        return this.request<T>('DELETE', path, options);
    }

    private async request<T>(
        method: string,
        path: string,
        options: RequestOptions
    ): Promise<T> {
        const token = this.userStorage.token;

        const response = await fetch(
            `${trimEnd(this.baseUrl, '/')}/${trimStart(path, '/')}`,
            {
                method,
                headers: {
                    'Content-type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(options.body),
            }
        );

        if (response.status >= 300) {
            throw new HttpError(response.status, 'Something went wrong');
        }

        const responseBody = await response.json();

        return responseBody;
    }
}

export const httpService = new HttpService(config.serverUrl);

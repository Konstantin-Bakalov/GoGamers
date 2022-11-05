import { isUndefined, omitBy, trimEnd, trimStart } from 'lodash';
import { ErrorName, GenericError, UnknownError, ValidationError } from 'shared';
import { config } from '../config';
import { UserStorage } from './user-storage-service';

export class HttpError extends Error {
    constructor(
        public status: number,
        public message: string,
        // We don't know what type the body could have
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public body: any,
    ) {
        super(message);
    }
}

interface RequestOptions {
    body?: unknown;
    query?: Record<string, string | undefined>;
}

class HttpService {
    private userStorage = new UserStorage();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public authErrorHandler = () => {};

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

    async delete<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('DELETE', path, options);
    }

    private async parseError(response: Response) {
        let body;

        try {
            body = await response.json();

            if (!body.name) {
                return new UnknownError('', body);
            }

            switch (body.name) {
                case ErrorName.ValidationError: {
                    return new ValidationError(body.message, body.data);
                }

                default:
                    return new UnknownError(body.name, body);
            }
        } catch {
            return new GenericError('Something went wrong', body);
        }
    }

    private async request<T>(
        method: string,
        path: string,
        options: RequestOptions,
    ): Promise<T> {
        const token = this.userStorage.token;

        const queryWithoutUndefined = omitBy(
            options.query,
            isUndefined,
        ) as Record<string, string>;

        const queryParams = new URLSearchParams(
            queryWithoutUndefined,
        ).toString();

        const url = `${trimEnd(this.baseUrl, '/')}/${trimStart(
            path,
            '/',
        )}?${queryParams}`;

        const response = await fetch(url, {
            method,
            headers: {
                ...(options.body ? { 'Content-type': 'application/json' } : {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        });

        if (response.status === 401) {
            this.authErrorHandler();
        }

        if (response.status >= 400) {
            throw await this.parseError(response);
        }

        const responseBody = await response.json();

        return responseBody;
    }
}

export const httpService = new HttpService(config.serverUrl);

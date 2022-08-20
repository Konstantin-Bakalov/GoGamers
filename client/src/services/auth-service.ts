import jwtDecode from 'jwt-decode';

export interface User {
    username: string;
    userId: number;
}

type AuthHandler = (user: User | undefined) => void;

export class HttpError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}

class AuthService {
    private handler: AuthHandler | undefined = undefined;

    private setToken(token: string | undefined) {
        if (!token) {
            localStorage.removeItem('token');
            this.handler?.(undefined);
            return;
        }

        localStorage.setItem('token', token);

        const user = jwtDecode<User>(token);
        this.handler?.(user);
    }

    get currentUser() {
        const token = localStorage.getItem('token');

        if (!token) {
            return undefined;
        }

        return jwtDecode<User>(token);
    }

    get token() {
        return localStorage.getItem('token') ?? undefined;
    }

    setHandler(handler: AuthHandler | undefined) {
        this.handler = handler;
    }

    async login(username: string, password: string) {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status >= 300) {
            throw new HttpError(response.status, 'Something went wrong');
        }

        const loginResponse = await response.json();
        this.setToken(loginResponse.token);
    }

    logout() {
        this.setToken(undefined);
    }
}

export const authService = new AuthService();

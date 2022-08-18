export interface User {
    username: string;
}

type AuthHandler = (user: User | null) => void;

class AuthService {
    private handler: AuthHandler | null = null;

    private setUser(user: User | null) {
        if (user?.username) {
            localStorage.setItem('currentUsername', user?.username);
        } else {
            localStorage.removeItem('currentUsername');
        }
        this.handler?.(user);
    }

    get currentUser() {
        const username = localStorage.getItem('currentUsername');
        return username ? { username } : null;
    }

    setHandler(handler: AuthHandler | null) {
        this.handler = handler;
    }

    login(username: string) {
        this.setUser({ username });
    }

    logout() {
        this.setUser(null);
    }
}

export const authService = new AuthService();

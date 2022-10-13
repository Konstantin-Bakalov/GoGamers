import { httpService } from './http-service';

class UserService {
    async register(username: string, password: string) {
        return await httpService.post('/users', {
            body: { username, password },
        });
    }
}

export const userService = new UserService();

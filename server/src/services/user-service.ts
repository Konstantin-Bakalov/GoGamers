import { UserModel } from '../models/user-model';
import { User } from 'shared';

class UserService {
    async create(user: Omit<User, 'id'>) {
        return await UserModel.query().insertAndFetch({
            name: user.name,
            email: user.email,
            picture: user.picture,
        });
    }

    async getUserByEmail(email: string) {
        return await UserModel.query().findOne({ email });
    }
}

export default new UserService();

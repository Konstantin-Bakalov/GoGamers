import { UserModel } from '../models/user-model';
import { User } from 'shared';

class UserService {
    async create(user: User) {
        return await UserModel.query().insertAndFetch({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    }

    async getUserByEmail(email: string) {
        return await UserModel.query().findOne({ email });
    }
}

export default new UserService();

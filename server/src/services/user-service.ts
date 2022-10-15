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

    async getUser(id: number) {
        return await UserModel.query().findById(id).throwIfNotFound();
    }

    async getUserByEmail(email: string) {
        return await UserModel.query().findOne({ email });
    }

    async listAll() {
        const users = await UserModel.query()
            .modifiers({
                usersWithoutPasswords: (query) => query.select('name'),
            })
            .modify('usersWithoutPasswords');

        return users;
    }
}

export default new UserService();

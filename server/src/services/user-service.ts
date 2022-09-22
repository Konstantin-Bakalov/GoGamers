import bcrypt from 'bcrypt';
import { config } from '../../config';
import { UserModel } from '../models/user-model';
import { RegisterInput } from 'shared';

class UserService {
    async register(input: RegisterInput) {
        const rounds = config.get('hash.rounds');

        const password = await bcrypt.hash(input.password, rounds);
        const user = await UserModel.query().insertAndFetch({
            name: input.username,
            password,
        });

        return user;
    }

    async login(name: string, plainTextPassword: string) {
        const user = await UserModel.query().findOne({ name });

        if (user) {
            return (await bcrypt.compare(plainTextPassword, user.password))
                ? user
                : undefined;
        }

        return undefined;
    }

    async getUser(id: number) {
        return await UserModel.query().findById(id).throwIfNotFound();
    }

    async getUserByName(name: string) {
        return await UserModel.query().findOne({ name });
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

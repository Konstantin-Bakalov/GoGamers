import bcrypt from 'bcrypt';
import { config } from '../../config';
import { UserModel } from '../models/user-model';

class UserService {
  async register(name: string, plainTextPassowrd: string, age: number) {
    const rounds = config.get('hash.rounds');

    const password = await bcrypt.hash(plainTextPassowrd, rounds);

    const user = await UserModel.query().insertAndFetch({
      name,
      password,
      age,
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
        usersWithoutPasswords: (query) => query.select('name', 'age'),
      })
      .modify('usersWithoutPasswords');

    return users;
  }
}

export default new UserService();

import bcrypt from 'bcrypt';
import { UserModel } from '../models/user-model';

const SALT_ROUNDS = 10;

class UserService {
  async register(name: string, plainTextPassowrd: string, age: number) {
    const password = await bcrypt.hash(plainTextPassowrd, SALT_ROUNDS);

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
      return await bcrypt.compare(plainTextPassword, user.password);
    }

    return false;
  }

  listAll() {
    const users = UserModel.query()
      .modifiers({
        usersWithoutPasswords: (query) => query.select('name', 'age'),
      })
      .modify('usersWithoutPasswords');

    return users;
  }
}

export default new UserService();

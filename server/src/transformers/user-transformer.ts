import { UserModel } from '../models/user-model';

export class UserTransformer {
    transform(user: UserModel) {
        return {
            username: user.name,
            age: user.age,
        };
    }

    transformArray(users: UserModel[]) {
        return users.map((user) => this.transform(user));
    }
}

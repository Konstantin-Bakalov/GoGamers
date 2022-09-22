import { UserModel } from '../models/user-model';

export class UserTransformer {
    transform(user: UserModel) {
        return {
            username: user.name,
        };
    }

    transformArray(users: UserModel[]) {
        return users.map((user) => this.transform(user));
    }
}

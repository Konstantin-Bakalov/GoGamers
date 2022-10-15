import { BaseModel } from './base-model';

export class UserModel extends BaseModel {
    name!: string;
    email!: string;
    profilePicture!: string;

    static get tableName() {
        return 'users';
    }
}

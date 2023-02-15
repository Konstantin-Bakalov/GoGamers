import { BaseModel } from './base-model';

export class UserModel extends BaseModel {
    name!: string;
    email!: string;
    picture!: string;

    static get tableName() {
        return 'users';
    }
}

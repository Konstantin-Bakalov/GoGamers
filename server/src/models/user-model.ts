import { BaseModel } from './base-model';

export class UserModel extends BaseModel {
    name!: string;
    password!: string;

    static get tableName() {
        return 'users';
    }
}

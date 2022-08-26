import { BaseModel } from './base-model';

export class UserModel extends BaseModel {
    name!: string;
    password!: string;
    age!: number | null;

    static get tableName() {
        return 'users';
    }
}

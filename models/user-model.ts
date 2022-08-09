import { Model } from 'objection';

export class UserModel extends Model {
  id!: number;
  name!: string;
  password!: string;
  age!: number | null;
  created_at!: Date;

  static get tableName() {
    return 'users';
  }
}

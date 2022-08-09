import { Model, QueryContext } from 'objection';

export class UserModel extends Model {
  id!: number;
  name!: string;
  password!: string;
  age!: number | null;
  createdAt!: Date;

  static get tableName() {
    return 'users';
  }

  async $beforInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date();
  }
}

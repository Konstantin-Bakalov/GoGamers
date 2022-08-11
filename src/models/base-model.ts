import { Model, QueryContext } from 'objection';

export class BaseModel extends Model {
  id!: number;
  createdAt!: Date;

  async $beforInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date();
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const objection_1 = require("objection");
class BaseModel extends objection_1.Model {
    async $beforInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        this.createdAt = new Date();
    }
}
exports.BaseModel = BaseModel;

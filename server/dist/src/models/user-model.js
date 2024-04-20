"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const base_model_1 = require("./base-model");
class UserModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'users';
    }
}
exports.UserModel = UserModel;

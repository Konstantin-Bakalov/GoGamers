"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const base_model_1 = require("./base-model");
class LikeModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'likes';
    }
}
exports.LikeModel = LikeModel;

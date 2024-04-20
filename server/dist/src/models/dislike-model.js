"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikeModel = void 0;
const base_model_1 = require("./base-model");
class DislikeModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'dislikes';
    }
}
exports.DislikeModel = DislikeModel;

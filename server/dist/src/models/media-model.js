"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModel = void 0;
const base_model_1 = require("./base-model");
class MediaModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'media';
    }
}
exports.MediaModel = MediaModel;

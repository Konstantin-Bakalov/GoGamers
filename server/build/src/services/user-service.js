"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user-model");
class UserService {
    async create(user) {
        return await user_model_1.UserModel.query().insertAndFetch({
            name: user.name,
            email: user.email,
            picture: user.picture,
        });
    }
    async getUserByEmail(email) {
        return await user_model_1.UserModel.query().findOne({ email });
    }
}
exports.default = new UserService();

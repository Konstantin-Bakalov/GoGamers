"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransformer = void 0;
class UserTransformer {
    transform(user) {
        return {
            username: user.name,
        };
    }
    transformArray(users) {
        return users.map((user) => this.transform(user));
    }
}
exports.UserTransformer = UserTransformer;

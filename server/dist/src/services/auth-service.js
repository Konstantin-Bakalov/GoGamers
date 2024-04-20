"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    generateUserToken(user) {
        const jwtKey = config_1.config.get('server.jwt_key');
        return jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
        }, jwtKey, {
            expiresIn: '24h',
        });
    }
}
exports.authService = new AuthService();

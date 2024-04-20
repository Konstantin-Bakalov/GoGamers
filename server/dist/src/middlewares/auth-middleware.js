"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user-service"));
function verify(token, key) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, key, (error, decoded) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(decoded);
        });
    });
}
async function auth(request, response, next) {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const jwt_key = config_1.config.get('server.jwt_key');
    if (token) {
        try {
            const decoded = (await verify(token, jwt_key));
            const user = await user_service_1.default.getUserByEmail(decoded.email);
            if (!user) {
                response.status(401).json({ error: 'Unauthorized' });
                return;
            }
            response.locals.user = user;
            next();
        }
        catch (error) {
            response.status(401).json({ error: 'Invalid token' });
        }
    }
    else {
        response.status(401).json({ error: 'Something went wrong' });
    }
}
exports.default = auth;
function currentUser(response) {
    return response.locals.user;
}
exports.currentUser = currentUser;

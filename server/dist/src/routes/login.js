"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("../services/user-service"));
const request_handler_1 = require("../lib/request-handler");
const zod_1 = require("zod");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const auth_service_1 = require("../services/auth-service");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', (0, request_handler_1.requestHandler)(async (req, res) => {
    const credential = zod_1.z.string().parse(req.body.credential);
    const userDecoded = (0, jwt_decode_1.default)(credential);
    let user = await user_service_1.default.getUserByEmail(userDecoded.email);
    if (!user) {
        user = await user_service_1.default.create(userDecoded);
    }
    const token = auth_service_1.authService.generateUserToken(user);
    res.status(200).json({ token });
}));
exports.default = loginRouter;

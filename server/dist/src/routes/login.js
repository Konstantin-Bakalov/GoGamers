"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
loginRouter.post('/', (0, request_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = zod_1.z.string().parse(req.body.credential);
    const userDecoded = (0, jwt_decode_1.default)(credential);
    let user = yield user_service_1.default.getUserByEmail(userDecoded.email);
    if (!user) {
        user = yield user_service_1.default.create(userDecoded);
    }
    const token = auth_service_1.authService.generateUserToken(user);
    res.status(200).json({ token });
})));
exports.default = loginRouter;

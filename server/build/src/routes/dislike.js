"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shared_1 = require("shared");
const zod_1 = require("zod");
const request_handler_1 = require("../lib/request-handler");
const auth_middleware_1 = __importStar(require("../middlewares/auth-middleware"));
const dislike_service_1 = require("../services/dislike-service");
const dislike_transformer_1 = require("../transformers/dislike-transformer");
const dislikesRouter = (0, express_1.Router)();
const dislikeTransformer = new dislike_transformer_1.DislikeTransformer();
dislikesRouter.post('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const reviewId = zod_1.z.number().parse(req.body.reviewId);
    const user = (0, auth_middleware_1.currentUser)(res);
    const dislike = await dislike_service_1.dislikesService.create(user.id, reviewId);
    res.status(200).json(dislikeTransformer.transform(dislike));
}));
dislikesRouter.delete('/:reviewId', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const reviewId = (0, shared_1.zodStringAsNumber)().parse(req.params.reviewId);
    const user = (0, auth_middleware_1.currentUser)(res);
    await dislike_service_1.dislikesService.delete(user.id, reviewId);
    res.status(200).json({});
}));
exports.default = dislikesRouter;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_handler_1 = require("../lib/request-handler");
const auth_middleware_1 = __importStar(require("../middlewares/auth-middleware"));
const shared_1 = require("shared");
const review_service_1 = require("../services/review-service");
const review_transformer_1 = require("../transformers/review-transformer");
const zod_validator_1 = require("../lib/zod-validator");
const reviewRouter = (0, express_1.Router)();
const reviewTransformer = new review_transformer_1.ReviewTransformer();
const pageSize = 3;
reviewRouter.post('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = shared_1.ReviewModelRequestSchema.parse(req.body);
    const user = (0, auth_middleware_1.currentUser)(res);
    const createdReview = yield review_service_1.reviewService.create({
        userId: user.id,
        username: user.name,
        gameId: review.gameId,
        body: review.body,
    });
    res.status(200).json(reviewTransformer.transform(createdReview));
})));
reviewRouter.get('/:gameId', auth_middleware_1.default, (0, request_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = (0, zod_validator_1.zodStringAsNumber)().parse(req.query.page);
    const gameId = (0, zod_validator_1.zodStringAsNumber)().parse(req.params.gameId);
    const user = (0, auth_middleware_1.currentUser)(res);
    const { results, total } = yield review_service_1.reviewService.list(user.id, gameId, page - 1, pageSize);
    res.status(200).json({
        results: reviewTransformer.transformArray(results),
        total,
    });
})));
exports.default = reviewRouter;

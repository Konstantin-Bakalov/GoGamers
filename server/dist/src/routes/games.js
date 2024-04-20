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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const request_handler_1 = require("../lib/request-handler");
const auth_middleware_1 = __importStar(require("../middlewares/auth-middleware"));
const game_service_1 = __importDefault(require("../services/game-service"));
const game_transformer_1 = require("../transformers/game-transformer");
const shared_1 = require("shared");
const zod_validator_1 = require("../lib/zod-validator");
const gamesRouter = (0, express_1.Router)();
const transformer = new game_transformer_1.GameTransformer();
gamesRouter.get('/:id', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const { id } = req.params;
    const game = await game_service_1.default.findGameById(Number(id));
    res.status(200).json(transformer.transform(game));
}));
gamesRouter.get('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const page = (0, zod_validator_1.zodStringAsNumber)().parse(req.query.page);
    const maxItems = (0, zod_validator_1.zodStringAsNumber)().parse(req.query.maxItems);
    const searchText = zod_1.z.string().optional().parse(req.query.searchText);
    const orderBy = zod_1.z.string().parse(req.query.orderBy);
    const { results, total } = await game_service_1.default.listGames({
        page: page - 1,
        pageSize: maxItems,
        searchText,
        orderBy,
    });
    res.status(200).json({
        results: transformer.transformArray(results),
        total,
    });
}));
gamesRouter.post('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const user = (0, auth_middleware_1.currentUser)(res);
    const parsedGame = shared_1.GameModelRequestSchema.parse(Object.assign(Object.assign({}, req.body), { userId: user.id, releaseDate: new Date(req.body.releaseDate) }));
    const game = await game_service_1.default.create(parsedGame);
    res.status(200).json(transformer.transform(game));
}));
gamesRouter.delete('/:id', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const id = (0, zod_validator_1.zodStringAsNumber)().parse(req.params.id);
    const user = (0, auth_middleware_1.currentUser)(res);
    await game_service_1.default.deleteById(id, user.id);
    res.status(200).json({ message: 'Game deleted' });
}));
gamesRouter.put('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)(async (req, res) => {
    const user = (0, auth_middleware_1.currentUser)(res);
    const game = shared_1.UpdateGameModelSchema.parse(Object.assign(Object.assign({}, req.body), { releaseDate: new Date(req.body.releaseDate) }));
    const updatedGame = await game_service_1.default.update(game, user.id);
    res.status(201).json(transformer.transform(updatedGame));
}));
exports.default = gamesRouter;

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
exports.genresRouter = void 0;
const express_1 = require("express");
const request_handler_1 = require("../lib/request-handler");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const genre_service_1 = __importDefault(require("../services/genre-service"));
const gerne_transformer_1 = require("../transformers/gerne-transformer");
const genresRouter = (0, express_1.Router)();
exports.genresRouter = genresRouter;
const transformer = new gerne_transformer_1.GenreTransformer();
genresRouter.get('/', auth_middleware_1.default, (0, request_handler_1.requestHandler)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield genre_service_1.default.all();
    response.status(200).json(transformer.transformArray(genres));
})));

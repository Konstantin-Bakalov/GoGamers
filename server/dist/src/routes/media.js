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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRouter = void 0;
const express_1 = require("express");
const request_handler_1 = require("../lib/request-handler");
const config_1 = require("../../config");
const cloudinary_1 = require("cloudinary");
exports.mediaRouter = (0, express_1.Router)();
cloudinary_1.v2.config({
    cloud_name: config_1.config.get('cloudinary.name'),
    api_key: config_1.config.get('cloudinary.key'),
    api_secret: config_1.config.get('cloudinary.secret'),
});
exports.mediaRouter.post('/', (0, request_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const media = req.body.media;
    const type = req.body.type;
    const result = yield cloudinary_1.v2.uploader.upload(media, {
        upload_preset: config_1.config.get('cloudinary.preset'),
        discard_original_filename: true,
        resource_type: type,
    });
    res.status(200).json({ url: result.url });
})));

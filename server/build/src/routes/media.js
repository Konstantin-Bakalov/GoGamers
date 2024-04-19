"use strict";
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
exports.mediaRouter.post('/', (0, request_handler_1.requestHandler)(async (req, res) => {
    const media = req.body.media;
    const type = req.body.type;
    const result = await cloudinary_1.v2.uploader.upload(media, {
        upload_preset: config_1.config.get('cloudinary.preset'),
        discard_original_filename: true,
        resource_type: type,
    });
    res.status(200).json({ url: result.url });
}));

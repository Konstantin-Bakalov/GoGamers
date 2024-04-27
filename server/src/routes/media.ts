import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import { config } from '../../config';
import { v2 as cloudinary } from 'cloudinary';

export const mediaRouter = Router();

type MediaType = 'image' | 'video';

cloudinary.config({
  cloud_name: config.get('cloudinary.name'),
  api_key: config.get('cloudinary.key'),
  api_secret: config.get('cloudinary.secret'),
});

mediaRouter.post(
  '/',
  requestHandler(async (req, res) => {
    const media = req.body.media;
    const type: MediaType = req.body.type;

    const result = await cloudinary.uploader.upload(media, {
      upload_preset: config.get('cloudinary.preset'),
      discard_original_filename: true,
      resource_type: type,
      secure: true,
    });

    res.status(200).json({ url: result.url });
  })
);

import { Router } from 'express';
import auth from '../middlewares/auth-middleware';
import { s3Service } from '../services/s3-service';

const s3Router = Router();

s3Router.get('/', auth, async (req, res) => {
    const url = await s3Service.generateUploadURL();

    res.json({ url });
});

export default s3Router;

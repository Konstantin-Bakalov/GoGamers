import { S3 } from 'aws-sdk';
import { config } from '../../config';
import crypto from 'crypto';
import { promisify } from 'util';

const name = config.get('aws.bucketName');
const region = config.get('aws.bucketRegion');
const accessKeyId = config.get('aws.bucketAccessKey');
const secretAccessKey = config.get('aws.bucketSecretKey');

const randomBytes = promisify(crypto.randomBytes);

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
});

class S3Service {
    async generateUploadURL() {
        const bytes = await randomBytes(16);
        const imageName = bytes.toString('hex');

        const params = {
            Bucket: name,
            Key: imageName,
            Expires: 60,
        };

        return await s3.getSignedUrlPromise('putObject', params);
    }
}

export const s3Service = new S3Service();

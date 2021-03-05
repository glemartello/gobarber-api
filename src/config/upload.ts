import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadConfig;

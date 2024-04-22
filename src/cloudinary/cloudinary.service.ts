// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadFile(fileName: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(fileName.buffer).pipe(upload);
    });
  }

  async deleteFile(fileId: string) {
    v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    const url = fileId;

    const filename = url.substring(url.lastIndexOf('/') + 1);

    const filenameWithoutExtension = filename.split('.')[0];
    v2.uploader.destroy(filenameWithoutExtension, function (result) {
      return result;
    });
  }
}

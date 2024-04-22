// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dqxgzrgab',
      api_key: '681714693314983',
      api_secret: 'S_P_H3qnAnoPMa1WPgMK_aCwKn0',
    });
  },
};

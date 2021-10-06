import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const name = file.originalname.split('.')[0].trim();
          const ext = file.originalname.split('.')[1].trim();
          callback(null, `${name}.${ext}`);
        },
      }),
    };
  }
}

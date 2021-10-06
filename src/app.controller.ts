import {
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

// https://dev.to/vjnvisakh/uploading-to-s3-using-nestjs-4037 referência para upload no aws s3
@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.verbose(`Nome do arquivo enviado: ${file.originalname}`);
    console.log(file.size);
    console.log(file);
    return {
      fileUploded: `http://localhost:3000/images/${file.originalname}`,
    };
  }
}

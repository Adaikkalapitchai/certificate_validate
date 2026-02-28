import { Controller, Post, Body, Get, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private service: CertificateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.service.create(body, file);
  }

  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.service.validate(code);
  }
}
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private service: CertificateService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.service.validate(code);
  }
}
// src/certificate/certificate.module.ts
import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
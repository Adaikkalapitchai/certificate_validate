import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Certificate } from './certificate.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private repo: Repository<Certificate>,
  ) {}

  async create(data: any) {
    const code = uuidv4(); // generate unique verification code

    const cert = this.repo.create({
      ...data,
      verificationCode: code,
    });

    await this.repo.save(cert);

    return cert;
  }

  async validate(code: string) {
    return this.repo.findOne({ where: { verificationCode: code } });
  }
}
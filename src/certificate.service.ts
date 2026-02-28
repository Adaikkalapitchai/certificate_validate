import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepo: Repository<Certificate>,
  ) {}

  async create(body: any, file?: Express.Multer.File): Promise<Certificate> {
    const certificate = new Certificate();
    certificate.holderName = body.holderName;
    certificate.courseName = body.courseName;
    certificate.instituteName = body.instituteName;
    certificate.issueDate = body.issueDate;
    certificate.verificationCode = uuidv4();

    if (file) {
      // Save locally in project folder
      const uploadDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
      const filePath = path.join(uploadDir, file.originalname);
      fs.writeFileSync(filePath, file.buffer);

      // Save relative path to DB
      certificate.filePath = `/uploads/${file.originalname}`;
    }

    try {
      return await this.certificateRepo.save(certificate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async validate(code: string) {
    const cert = await this.certificateRepo.findOne({ where: { verificationCode: code } });
    if (!cert) throw new BadRequestException('Certificate not found');
    return cert;
  }
}
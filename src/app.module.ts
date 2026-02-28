import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificateModule } from './certificate.module';
import { ConfigModule } from '@nestjs/config';
import { CertificateService } from './certificate.service';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST,
      port: Number(process.env.MYSQLPORT),
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CertificateModule
  ],
  controllers: [AppController, ],
  providers: [ AppService],
})
export class AppModule { }
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE);
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificateModule } from './certificate.module';

@Module({
  imports: [
    CertificateModule,
    TypeOrmModule.forRoot({
      type: 'mysql',                 // Database type
      host: '127.0.0.1',             // Database host
      port: 3306,                     // Database port
      username: 'root',               // DB username
      password: '',                   // DB password
      database: 'certificat_validation', // Database name
      autoLoadEntities: true,         // Automatically load entities
      synchronize: true,              // Auto-create tables (use false in production)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://deepak-apps.netlify.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  let port = 'mysql://root:LUngqUgpyLXyxBdpppxqWPjeMYkruCCj@yamabiko.proxy.rlwy.net:21727/railway';

  await app.listen(port || 3000);
}
bootstrap();
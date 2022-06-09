import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(CookieParser())
  await app.listen(4000);
  app.getUrl().then((host) => {
    Logger.debug(`Server running at ${host}`, 'NestServer');
    Logger.debug(`SwaggerUI at ${host}/docs`, 'NestServer');
  });
}
bootstrap();
 
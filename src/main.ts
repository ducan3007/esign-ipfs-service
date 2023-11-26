import { NestFactory } from '@nestjs/core';
import { AppModule, AppModulePublic } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from '@logger';
import { config } from '@config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const publicApp =
    await NestFactory.create<NestExpressApplication>(AppModulePublic);

  app.setGlobalPrefix('api');
  publicApp.setGlobalPrefix('api');

  app.enableCors();
  publicApp.enableCors();

  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { limit: '50mb' });

  publicApp.useBodyParser('json', { limit: '50mb' });

  const sConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, sConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = config.get('PORT');
  await app.listen(port);
  logger.info(`Listening at http://localhost:${port}/${'api'}`);

  const sConfig2 = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document2 = SwaggerModule.createDocument(publicApp, sConfig);
  SwaggerModule.setup('api', app, document);

  const publicPort = config.get('IPFS_PUBLIC_PORT');
  await publicApp.listen(publicPort);
  logger.info(`Public listening at http://localhost:${publicPort}/${'api'}`);
}
bootstrap();

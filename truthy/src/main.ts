import { useContainer } from 'class-validator';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import * as config from 'config';
import * as cookieParser from 'cookie-parser';

import * as Bull from 'bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';

import { AppModule } from 'src/app.module';

const connectionOpts = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
};

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  const apiConfig = config.get('app');

  // baseurl
  app.setGlobalPrefix('api');

  // bull-board
  // http://localhost:7777/api/bull-board/queue/helloworld_queue
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/api/bull-board');
  const aQueue = new Bull('helloworld_queue', { redis: { ...connectionOpts } });
  createBullBoard({ queues: [new BullAdapter(aQueue)], serverAdapter });
  app.use('/api/bull-board', serverAdapter.getRouter());
  logger.log({ redis_config: connectionOpts });
  // bull-board

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle(apiConfig.name)
      .setDescription(apiConfig.description)
      .setVersion(apiConfig.version)
      .addBearerAuth()
      .build();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: apiConfig.description,
    };

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, document, customOptions);
  } else {
    app.enableCors({
      origin: process.env.ORIGIN || serverConfig.origin,
      credentials: true,
    });
    logger.log(`Accepting request only from: ${process.env.ORIGIN || serverConfig.origin}`);
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));

  app.use(cookieParser());

  await app.listen(port);

  logger.log(`Application listening in port: ${port}`);
}

bootstrap();

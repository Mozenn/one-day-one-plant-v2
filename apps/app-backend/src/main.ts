import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';
import { RemovePasswordInterceptor } from './shared/removePassword.interceptor';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { SentryFilter } from './shared/sentry.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(cookie);
  await app.register(helmet);

  const configService = app.get(ConfigService);
  const originUrlCount = configService.get('ORIGIN_URL_COUNT');
  const originUrls = [];
  for (let i = 0; i < originUrlCount; i++) {
    originUrls.push(configService.get(`ORIGIN_URL_${i}`));
  }
  app.enableCors({
    origin: [...originUrls],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RemovePasswordInterceptor());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  app.useLogger(app.get(Logger));
  await app.listen(configService.get('APPLICATION_PORT'), '0.0.0.0');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
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

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(cookie);

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL');
  if (frontendUrl) {
    app.enableCors({
      origin: configService.get('FRONTEND_URL'),
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RemovePasswordInterceptor());
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();

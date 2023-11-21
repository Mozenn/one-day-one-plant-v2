import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { PlantModule } from './plant/plant.module';
import { PrismaModule } from './shared/prisma.module';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    MemberModule,
    PlantModule,
    PrismaModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

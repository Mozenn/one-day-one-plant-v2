import { Module, Logger } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PlantModule } from 'src/plant/plant.module';
import { PlantService } from 'src/plant/plant.service';

@Module({
  imports: [PlantModule],
  controllers: [UserController],
  providers: [UserService, Logger, PlantService],
  exports: [UserService, PlantService],
})
export class UserModule {}

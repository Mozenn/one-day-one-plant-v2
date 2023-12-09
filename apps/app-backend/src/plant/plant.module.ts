import { Module, Logger } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';

@Module({
  imports: [],
  controllers: [PlantController],
  providers: [PlantService, Logger],
  exports: [PlantService],
})
export class PlantModule {}

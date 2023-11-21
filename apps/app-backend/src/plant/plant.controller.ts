import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantPageDto } from './plant-page.dto';
import { Plant } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';

@Controller('plant')
export class PlantController {
  constructor(
    private readonly plantService: PlantService,
    private readonly logger: Logger = new Logger(PlantController.name),
  ) {}

  @Get(':id')
  async getMember(@Param('id') id: string): Promise<Plant> {
    this.logger.log(`GetPlant request with id ${id}`);
    return await this.plantService.getPlant(+id);
  }

  @Get('draw')
  async drawPlant(@Query() memberId: string): Promise<Plant> {
    this.logger.log(`DrawPlant request for member ${memberId}`);
    return await this.plantService.drawPlant(+memberId);
  }

  @Get('page')
  getPlantPage(@Query() query: PlantPageDto): Promise<PaginationResult<Plant>> {
    this.logger.log(`GetPlantPage request with param ${query.page}`);
    return this.plantService.getPlantPage(query);
  }
}

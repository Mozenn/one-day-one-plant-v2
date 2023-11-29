import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantPageDto } from './plant-page.dto';
import { Plant } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';
import JwtAuthenticationGuard from 'src/auth/jwtAuth.guard';

@Controller('plant')
export class PlantController {
  constructor(
    private readonly plantService: PlantService,
    private readonly logger: Logger = new Logger(PlantController.name),
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getPlant(@Param('id') id: string): Promise<Plant> {
    this.logger.log(`GetPlant request with id ${id}`);
    return await this.plantService.getPlant(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('draw')
  async drawPlant(@Query('userId') userId: string): Promise<Plant> {
    this.logger.log(`DrawPlant request for user ${userId}`);
    let result;
    try {
      result = await this.plantService.drawPlant(+userId);
    } catch (error: any) {
      if (['in cooldown', 'user not found'].includes(error.cause)) {
        throw new BadRequestException(error.message);
      }
    }
    return result;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('page')
  getPlantPage(@Query() query: PlantPageDto): Promise<PaginationResult<Plant>> {
    this.logger.log(`GetPlantPage request with param ${query.page}`);
    return this.plantService.getPlantPage(query);
  }
}

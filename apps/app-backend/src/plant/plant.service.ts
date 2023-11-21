import { Injectable } from '@nestjs/common';
import { PlantPageDto } from './plant-page.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { Plant, Prisma } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';

@Injectable()
export class PlantService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlant(id: number): Promise<Plant | null> {
    const prismaId: Prisma.PlantWhereUniqueInput = {
      id: id,
    };
    return this.prisma.plant.findUnique({ where: prismaId });
  }

  async drawPlant(memberId: number): Promise<Plant | null> {
    // TODO find plantId to draw
    const plantToDraw = memberId;
    const prismaId: Prisma.PlantWhereUniqueInput = {
      id: plantToDraw,
    };
    return this.prisma.plant.findUnique({ where: prismaId });
  }

  async getPlantPage(pageDto: PlantPageDto): Promise<PaginationResult<Plant>> {
    const whereQuery = {
      name: {
        contains: pageDto.name?.toLowerCase(),
      },
      scientificName: {
        contains: pageDto.scientificName?.toLowerCase(),
      },
      family: {
        lte: pageDto.family,
      },
    };

    const [plants, count] = await this.prisma.$transaction([
      this.prisma.plant.findMany({
        skip: Math.max(pageDto.page * pageDto.elementsPerPage - 1, 0),
        take: pageDto.elementsPerPage,
        orderBy: [
          {
            [pageDto.key]: pageDto.direction,
          },
        ],
        where: whereQuery,
      }),
      this.prisma.plant.count({ where: whereQuery }),
    ]);

    return {
      content: plants,
      total: count,
    };
  }
}

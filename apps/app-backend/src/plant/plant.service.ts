import { Injectable } from '@nestjs/common';
import { PlantPageDto } from './plant-page.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { Plant, Prisma } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getPlant(id: number): Promise<Plant | null> {
    const prismaId: Prisma.PlantWhereUniqueInput = {
      id: id,
    };
    return this.prisma.plant.findUnique({ where: prismaId });
  }

  async drawPlant(userId: number): Promise<Plant | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        plants: true,
      },
    });

    if (!user) {
      const error = new Error(`Could not find user with id ${userId}`, {
        cause: 'user not found',
      });
      throw error;
    }

    const cooldownInMs = this.configService.get<number>('DRAW_COOLDOWN_MS');

    if (
      cooldownInMs - (new Date().getTime() - user.lastDrawDate.getTime()) >
      0
    ) {
      const error = new Error("Can't draw a new plant yet", {
        cause: 'in cooldown',
      });

      throw error;
    }

    const stackSize = 5;
    const plantStackToDraw = await this.prisma.plant.findMany({
      take: stackSize,
      where: {
        users: {
          every: {
            id: {
              not: userId,
            },
          },
        },
      },
    });

    const plantToDraw =
      plantStackToDraw[Math.floor(Math.random() * plantStackToDraw.length)];

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      include: {
        plants: true,
      },
      data: {
        lastDrawDate: new Date(),
        lastDrawPlantId: plantToDraw.id,
        plants: {
          connect: [{ id: plantToDraw.id }],
        },
      },
    });

    return plantToDraw;
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
      users: {
        some: {
          id: {
            equals: pageDto.userId,
          },
        },
      },
    };

    const [plants, count] = await this.prisma.$transaction([
      this.prisma.plant.findMany({
        skip: pageDto.page * pageDto.elementsPerPage,
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

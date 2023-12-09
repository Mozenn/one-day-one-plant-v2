import { Injectable } from '@nestjs/common';
import { UserPageDto } from './user-page.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { User } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';
import { ConfigService } from '@nestjs/config';
import { UpdateUserPictureDto } from './update-user-picture.dto';
import { PlantService } from 'src/plant/plant.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly plantService: PlantService,
  ) {}

  async getUser(id: number): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { plants: true, lastDrawPlant: true },
    });

    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        username: username,
      },
      include: { plants: true, lastDrawPlant: true },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: { plants: true, lastDrawPlant: true },
    });

    return user;
  }

  async getUserByEmailOrUsername(
    emailOrUsername: string,
  ): Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: emailOrUsername,
          },
          {
            username: emailOrUsername,
          },
        ],
      },
      include: { plants: true, lastDrawPlant: true },
    });

    return user;
  }

  async getUserPage(pageDto: UserPageDto): Promise<PaginationResult<User>> {
    const whereQuery = {
      username: {
        contains: pageDto.username?.toLowerCase(),
      },
      score: {
        gte: pageDto.score ? pageDto.score : undefined,
      },
    };

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: Math.max(pageDto.page * pageDto.elementsPerPage - 1, 0),
        take: pageDto.elementsPerPage,
        orderBy: [
          {
            [pageDto.key]: pageDto.direction,
          },
        ],
        where: whereQuery,
      }),
      this.prisma.user.count({ where: whereQuery }),
    ]);

    return {
      content: users,
      total: count,
    };
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const defaultPlant = await this.prisma.plant.findUnique({
      where: {
        name: this.configService.get<string>('DEFAULT_PLANT_NAME'),
      },
    });

    return this.prisma.user.create({
      data: {
        username: username,
        email: email,
        score: 0,
        createdAt: new Date(),
        password: password,
        verified: false,
        profilePlantUrl: defaultPlant.imageUrl,
        plants: {
          connect: [{ name: defaultPlant.name }],
        },
      },
    });
  }

  async updateUserPicture(
    updateUserPicture: UpdateUserPictureDto,
  ): Promise<User> {
    const plant = await this.plantService.getPlant(updateUserPicture.plantId);

    return await this.prisma.user.update({
      where: {
        id: updateUserPicture.userId,
      },
      data: {
        profilePlantUrl: plant.imageUrl,
      },
    });
  }

  async verifyUser(email: string): Promise<User> {
    return await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verified: true,
      },
    });
  }
}

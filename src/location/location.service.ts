import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { locationDto } from './dto/location.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllLocation() {
    try {
      let user = await this.prismaService.location.findMany();
      if (!user) {
        throw new NotFoundException(`No Location found`);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<locationDto> {
    try {
      let newLocation = await this.prismaService.location.create({
        data: createLocationDto,
      });
      return plainToClass(locationDto, newLocation);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchPaginationLocation(
    page: number,
    size: number,
    keyword: string,
  ): Promise<locationDto[]> {
    try {
      let searchLocations = await this.prismaService.location.findMany({
        where: keyword
          ? {
              location_name: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });
      return searchLocations.map((searchLocation) =>
        plainToClass(locationDto, searchLocation),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLocation(id: number): Promise<locationDto> {
    try {
      let location = await this.prismaService.location.findFirst({
        where: { id },
      });
      if (!location) {
        throw new NotFoundException(`No location found with ID: ${id}`);
      }
      return plainToClass(locationDto, location);
    } catch (error) {
      throw new Error(error);
    }
  }

  async UpdateLocation(
    id: number,
    createLocationDto: CreateLocationDto, //bởi vì cấu trúc giống nên dùng chung
  ): Promise<locationDto> {
    try {
      let updatedLocation = await this.prismaService.location.update({
        where: { id },
        data: createLocationDto,
      });

      return plainToClass(locationDto, updatedLocation);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteLocation(id: number): Promise<string> {
    try {
      const location = await this.prismaService.location.findFirst({
        where: { id },
      });

      if (!location) {
        throw new NotFoundException('Location not found');
      }

      await this.prismaService.location.delete({ where: { id } });

      return `Deleted location successfully`;
    } catch (error) {
      throw new Error(error);
    }
  }
}

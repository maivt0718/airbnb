import { PrismaService } from './../prisma/prisma.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDto } from './dto/users.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getAllUsers() {
    try {
      let user = await this.PrismaService.users.findMany();
      if (!user) {
        throw new NotFoundException(`No user found`);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postUsers(createUserDto: CreateUserDto): Promise<usersDto> {
    try {
      let newUser = await this.PrismaService.users.create({
        data: createUserDto,
      });
      return plainToClass(usersDto, newUser);
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(id: number): Promise<string> {
    try {
      const user = await this.PrismaService.users.findFirst({
        where: { id },
      });

      await this.PrismaService.book_room.deleteMany({
        where: { booking_user: id },
      });

      await this.PrismaService.book_room.deleteMany({
        where: { room_id: id },
      });

      await this.PrismaService.rooms.deleteMany({
        where: { passenger_id: id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.PrismaService.users.delete({ where: { id } });

      return `Deleted user successfully`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchPagination(
    page: number,
    size: number,
    keyword: string,
  ): Promise<usersDto[]> {
    try {
      let users = await this.PrismaService.users.findMany({
        where: keyword
          ? {
              username: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });
      return users.map((user) => plainToClass(usersDto, user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser(id: number): Promise<usersDto> {
    try {
      let user = await this.PrismaService.users.findFirst({
        where: { id },
      });

      return plainToClass(usersDto, user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<usersDto> {
    try {
      let updatedUser = await this.PrismaService.users.update({
        where: { id },
        data: updateUserDto,
      });

      return plainToClass(usersDto, updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchUserName(username: string): Promise<usersDto[]> {
    try {
      let users = await this.PrismaService.users.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });

      return users.map((user) => plainToClass(usersDto, user));
    } catch (error) {
      throw new Error(error);
    }
  }
}

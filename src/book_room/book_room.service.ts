import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryUploadService } from 'src/shared/cloudinary.service';
import { book_room, rooms } from '@prisma/client';
import { BookRoomDto } from './dto/book_room.dto';

@Injectable()
export class BookRoomService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly cloudinary: CloudinaryUploadService,
  ) {}
  async create(createBookRoomDto: BookRoomDto): Promise<book_room> {
    try {
      let { booking_user, room_id, ...bookRoomBody } = createBookRoomDto;
      let data = await this.PrismaService.book_room.create({
        data: {
          ...(room_id && { rooms: { connect: { id: room_id } } }),
          ...(booking_user && { users: { connect: { id: booking_user } } }),
          ...bookRoomBody,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<book_room[]> {
    try {
      let data = await this.PrismaService.book_room.findMany();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<book_room> {
    try {
      let data = await this.PrismaService.book_room.findFirst({
        where: { id },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateBookRoomDto: BookRoomDto): Promise<book_room> {
    try {
      let checkID = await this.PrismaService.book_room.findFirst({
        where: { id },
      });
      if (!checkID) {
        throw new BadRequestException('ID is not found');
      }

      let { room_id, booking_user, ...restOfBody } = updateBookRoomDto;
      let filteredBody = Object.fromEntries(
        Object.entries(restOfBody || {}).filter(
          ([_, value]) => value !== '' && value !== undefined,
        ),
      );
      console.log(filteredBody);
      let data = await this.PrismaService.book_room.update({
        data: {
          ...(room_id && { rooms: { connect: { id: room_id } } }),
          ...(booking_user && { users: { connect: { id: booking_user } } }),
          ...filteredBody,
        },
        where: { id },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      let checkID = await this.PrismaService.book_room.findFirst({
        where: { id },
      });
      if (!checkID) {
        throw new BadRequestException('ID is not found');
      }
      await this.PrismaService.book_room.delete({where: {id}})
      return `This action removes a #${id} bookRoom`;
    } catch (error) {
      throw new Error(error)
    }
  }
}

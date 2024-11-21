import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { roomDto } from './dto/rooms.dto';
import { rooms } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getAllRooms() {
    try {
      let rooms = await this.PrismaService.rooms.findMany();
      if (!rooms) {
        throw new NotFoundException('No rooms to fetch');
      }
      return rooms;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postRoom(body: roomDto):Promise<rooms>{
    try {
      let { passenger_id, room_name, room_number, location_id, ...restOfBody } = body;

      let checkRoom = await this.PrismaService.rooms.findFirst({
        where: { OR: [{ room_name }, { room_number }] },
      });
      if (checkRoom) {
        throw new BadRequestException('Room Name or Room Number is existed');
      }

      let checkLocation = await this.PrismaService.location.findFirst({
        where: { id: Number(location_id) },
      });

      if (!checkLocation) {
        throw new BadRequestException('Location doesnt exist');
      }

      let newRoom = await this.PrismaService.rooms.create({
        data: {
          ...(passenger_id && { users: { connect: { id: passenger_id } } }),
          ...(location_id && { location: { connect: { id: location_id } } }),
          ...restOfBody,
          room_name,
          room_number,
        },
      });
      return newRoom;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateRoom(id: number, body: roomDto):Promise<rooms> {
    try {
      let { passenger_id, location_id, ...restOfBody } = body;

      let checkRoom = await this.PrismaService.rooms.findFirst({
        where: { id },
      });

      if (!checkRoom) {
        throw new BadRequestException('Room doesnt exist');
      }

      let checkUser = await this.PrismaService.users.findFirst({
        where: { id: Number(passenger_id) },
      });

      if (!checkUser) {
        throw new BadRequestException('Users doesnt exist');
      }

      let checkLocation = await this.PrismaService.location.findFirst({
        where: { id: Number(location_id) },
      });

      if (!checkLocation) {
        throw new BadRequestException('Location doesnt exist');
      }

      let newData = await this.PrismaService.rooms.update({
        where: { id },
        data: {
          ...restOfBody,
          ...(location_id && {
            location: { connect: { id: Number(location_id) } },
          }),
          ...(passenger_id && {
            users: { connect: { id: Number(passenger_id) } },
          }),
        },
      });
      return newData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteRoom(id: number):Promise<string>{
    try {
      let checkRoom = await this.PrismaService.rooms.findFirst({
        where: { id },
      });

      if (!checkRoom) {
        throw new BadRequestException('Room doesnt exist');
      }

      let newData = await this.PrismaService.rooms.delete({
        where: { id },
      });
      return 'Deleted successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRoomByLocation(id: number):Promise<rooms[]> {
    try {
      let roomList = await this.PrismaService.rooms.findMany({
        where: {location_id: id}
      })
      return roomList
    } catch (error) {
      throw new Error(error);
    }
  }
}

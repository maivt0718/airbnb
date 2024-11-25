import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { roomDto } from './dto/rooms.dto';
import { rooms } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { CloudinaryUploadService } from 'src/shared/cloudinary.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly cloudinary: CloudinaryUploadService,
  ) {}

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

  async postRoom(body: roomDto, files: Express.Multer.File[]): Promise<rooms> {
    try {
      let { passenger_id, room_name, room_number, location_id, ...restOfBody } =
        body;

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

      let image_url = '';

      if (files.length > 1) {
        throw new BadRequestException('Only one image is allowed');
      }

      if (files && files.length > 0) {
        let data = await this.cloudinary.uploadDocument(files, 'roomsFolders');
        image_url = data[0].url;
      }

      let newRoom = await this.PrismaService.rooms.create({
        data: {
          ...(passenger_id && { users: { connect: { id: passenger_id } } }),
          ...(location_id && { location: { connect: { id: location_id } } }),
          ...restOfBody,
          room_name,
          room_number,
          images: image_url || '',
        },
      });
      return newRoom;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateRoom(
    id: number,
    body: roomDto,
    files: Express.Multer.File[],
  ): Promise<rooms> {
    try {
      let { images, passenger_id, location_id, ...restOfBody } = body;

      if (passenger_id) {
        let checkRoom = await this.PrismaService.rooms.findFirst({
          where: { id },
        });

        if (!checkRoom) {
          throw new BadRequestException('Room doesnt exist');
        }
      }

      if (passenger_id) {
        let checkUser = await this.PrismaService.users.findFirst({
          where: { id: Number(passenger_id) },
        });

        if (!checkUser) {
          throw new BadRequestException('Users doesnt exist');
        }
      }

      if (location_id) {
        let checkLocation = await this.PrismaService.location.findFirst({
          where: { id: Number(location_id) },
        });

        if (!checkLocation) {
          throw new BadRequestException('Location doesnt exist');
        }
      }

      let image_url = '';

      if (files && files.length == 1) {
        let data = await this.cloudinary.uploadDocument(files, 'roomsFolders');
        image_url = data[0].url;
      }
      if (files.length > 1) {
        throw new BadRequestException('Only one image is allowed');
      }

      let filteredRestBody = Object.fromEntries(
        Object.entries(restOfBody || {}).filter(
          ([_, value]) => value !== '' && value !== undefined,
        ),
      );

      console.log(filteredRestBody);

      let newData = await this.PrismaService.rooms.update({
        where: { id },
        data: {
          ...filteredRestBody,
          ...(location_id && {
            location: { connect: { id: Number(location_id) } },
          }),
          ...(passenger_id && {
            users: { connect: { id: Number(passenger_id) } },
          }),
          ...(image_url && { images: image_url }),
        },
      });
      return newData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteRoom(id: number): Promise<string> {
    try {
      let checkRoom = await this.PrismaService.rooms.findFirst({
        where: { id },
      });

      if (!checkRoom) {
        throw new BadRequestException('Room doesnt exist');
      }

      await this.PrismaService.rooms.delete({
        where: { id },
      });
      return 'Deleted successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRoomByLocation(id: number): Promise<rooms[]> {
    try {
      let checkLocation = await this.PrismaService.location.findFirst({
        where: { id },
      });

      if (!checkLocation) {
        throw new BadRequestException('Location doesnt exist');
      }
      let roomList = await this.PrismaService.rooms.findMany({
        where: { location_id: id },
      });
      return roomList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async geRoombyId(id: number) {
    try {
      let data = await this.PrismaService.rooms.findFirst({ where: { id } });
      if (!data) {
        throw new BadRequestException(`Id doesnt exist`);
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRoomsWithPagination(keyword: string, page: number, size: number) {
    try {
      let data = await this.PrismaService.rooms.findMany({
        where: {
          room_name: {
            contains: keyword,
          },
        },
        skip: (page - 1) * size,
        take: size,
      });
      return data.map((item) => plainToClass(roomDto, item));
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateRoomImagesName(data: string) {}
}

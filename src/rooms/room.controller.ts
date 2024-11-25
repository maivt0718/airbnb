import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { rooms } from '@prisma/client';
import { Response } from 'express';
import { roomDto } from './dto/rooms.dto';
import { filesUploadDto } from './dto/fileUpload.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryUploadService } from 'src/shared/cloudinary.service';

@ApiTags('Room session')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly RoomService: RoomService,
    private readonly cloudinary: CloudinaryUploadService,
  ) {}

  // Helper function to convert string 'true'/'false' to boolean
  private convertBooleans(body: any) {
    const booleanFields = [
      'laundry',
      'iron',
      'television',
      'air_conditioner',
      'wifi',
      'stove',
      'parking',
    ];
    booleanFields.forEach((field) => {
      if (body[field] === 'true') {
        body[field] = true;
      } else if (body[field] === 'false') {
        body[field] = false;
      }
    });
  }

  // Helper function to convert string numbers to actual numbers
  private convertNumbers(body: any) {
    const numberFields = [
      'room_number',
      'bed',
      'bathroom',
      'price',
      'location_id',
      'passenger_id',
    ];
    numberFields.forEach((field) => {
      body[field] = parseInt(body[field], 10);
    });
  }

  // Helper function to convert the images field into an array
  private convertImages(body: any) {
    if (body.images && typeof body.images === 'string') {
      body.images = body.images.split(','); // Assuming images are comma-separated
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/getAllRooms')
  async getAllRooms(@Res() res: Response): Promise<Response<rooms>> {
    try {
      let data = await this.RoomService.getAllRooms();
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FilesInterceptor('images'))
  @Put('/putRoom/:id')
  @ApiBody({type: roomDto, required: false})
  async putRoom(
    @Res() res: Response,
    @Body() body: roomDto,
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Response<rooms>> {
    try {
      this.convertBooleans(body);
      this.convertImages(body);
      this.convertNumbers(body)
      let data = await this.RoomService.updateRoom(Number(id), body, files);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @ApiBody({ type: roomDto })
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/postRoom')
  async postRoom(
    @Res() res: Response,
    @Body() body: roomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Response<rooms>> {
    try {
      this.convertBooleans(body);
      this.convertImages(body);
      this.convertNumbers(body)

      let data = await this.RoomService.postRoom(body, files);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Delete('/deleteRoom/:id')
  async deleteRoom(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<string>> {
    try {
      let data = await this.RoomService.deleteRoom(Number(id));
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/getRoomByID/:id')
  async getRoomByID(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<string>> {
    try {
      let data = await this.RoomService.geRoombyId(Number(id));
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/getRoomsByLocation')
  async getRoomsByLocation(
    @Res() res: Response,
    @Query('id') id: string,
  ): Promise<Response<string>> {
    try {
      let data = await this.RoomService.getRoomByLocation(Number(id));
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/getRoomWithPagination')
  @ApiQuery({ name: 'page', default: 1, required: false })
  @ApiQuery({ name: 'size', default: 5, required: false })
  @ApiQuery({ name: 'keyword', default: '', required: false })
  async getRoomWithPagination(
    @Res() res: Response,
    @Query('keyword') keyword: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ): Promise<Response<string>> {
    try {
      let data = await this.RoomService.getRoomsWithPagination(
        keyword,
        Number(page),
        Number(size),
      );
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @Post('/upload_room_cloud')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: filesUploadDto, required: true })
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadRoomPhoto(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      if (files.length > 1) {
        throw new BadRequestException('You can upload only 1 file');
      }
      let data = await this.cloudinary.uploadDocument(files, 'roomsFolders');
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

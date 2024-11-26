import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRoomDto } from './dto/book_room.dto';
import { AuthGuard } from '@nestjs/passport';
import { book_room } from '@prisma/client';
import { Response } from 'express';

@ApiTags('Booking')
@Controller('book-room')
export class BookRoomController {
  constructor(
    private readonly bookRoomService: BookRoomService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('/postBookRoom')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  async create(
    @Body() createBookRoomDto: BookRoomDto,
    @Res() res: Response,
  ): Promise<Response<book_room>> {
    try {
      let data = await this.bookRoomService.create(createBookRoomDto);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/getAllBookRooms')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  async findAll(@Res() res: Response): Promise<Response<book_room[]>> {
    try {
      let data = await this.bookRoomService.findAll();
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  async findOne(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<Response<book_room>> {
    try {
      let data = await this.bookRoomService.findOne(+id);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  async update(
    @Param('id') id: string,
    @Body() updateBookRoomDto: BookRoomDto,
    @Res() res: Response,
  ): Promise<Response<book_room>> {
    try {
      let data = await this.bookRoomService.update(+id, updateBookRoomDto);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      let data = await this.bookRoomService.remove(+id);
      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

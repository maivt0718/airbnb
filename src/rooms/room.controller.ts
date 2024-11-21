import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { rooms } from '@prisma/client';
import { Response } from 'express';
import { roomDto } from './dto/rooms.dto';

@ApiTags("Room session")
@Controller('rooms')
export class RoomController {
  constructor(private readonly RoomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/getAllRooms')
  async getAllRooms(
    @Res() res: Response,
  ): Promise<Response<rooms>> {
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
  @Put('/putRoom/:id')
  async putRoom(
    @Res() res: Response,
    @Body() body: roomDto,
    @Param("id") id: string
  ): Promise<Response<rooms>> {
    try {
      let data = await this.RoomService.updateRoom(Number(id), body);
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
  @Post('/postRoom')
  async postRoom(
    @Res() res: Response,
    @Body() body: roomDto
  ): Promise<Response<rooms>> {
    try {
      let data = await this.RoomService.postRoom(body);
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
    @Param("id") id: string
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
  @Get('/getRoomsByLocation')
  async getRoomsByLocation(
    @Res() res: Response,
    @Query("id") id: string
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
}

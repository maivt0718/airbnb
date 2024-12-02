import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FileUploadDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { usersDto } from './dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudUploadService } from '../shared/cloudinaryUpload.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudUploadService: CloudUploadService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list users successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  // get toàn bộ user
  @Get('/getAllUsers')
  async getAllUsers(@Res() res: Response): Promise<Response<usersDto[]>> {
    try {
      let users = await this.usersService.getAllUsers();
      return res.status(HttpStatus.OK).json({ message: users });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create users successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  // tạo user
  @Post('/createUser')
  async create(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<usersDto>> {
    try {
      let users = await this.usersService.postUsers(body);
      return res.status(HttpStatus.CREATED).json({ message: users });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list users successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  // xoá user@Delete('deleteUser/:id')
  @Delete('deleteUser/:id')
  async deleteUser(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<string>> {
    try {
      const data = await this.usersService.deleteUser(Number(id));

      if (!data) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User not found' });
      }

      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @Get('/searchPagination')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list user successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server ',
  })
  async searchPaginationUser(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<usersDto[]>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let user = await this.usersService.searchPagination(
        formatPage,
        formatSize,
        keyword,
      );
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted user successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get('getUser/:id')
  async findOneUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<usersDto>> {
    try {
      let user = await this.usersService.getUser(parseInt(id, 10));
      return res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update user successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Put('/updateUser/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response<usersDto>> {
    try {
      let updatedUser = await this.usersService.updateUser(parseInt(id), body);
      return res.status(HttpStatus.OK).json({ message: updatedUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server' });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @Get('/searchUser')
  async searchUser(
    @Query('username') username: string,
    @Res() res: Response,
  ): Promise<Response<usersDto[]>> {
    try {
      let user = await this.usersService.searchUserName(username);
      if (user.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User not found' });
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server' });
    }
  }

  // upload lên cloudinary
  @Post('/upload-user-cloud')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    required: true,
  })
  @UseInterceptors(FileInterceptor('formFile'))
  async uploadUserCloud(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cloudUploadService.uploadImage(
        file,
        'formData',
      );
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Upload failed' });
    }
  }
}

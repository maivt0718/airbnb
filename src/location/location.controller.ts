import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Res,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LocationService } from './location.service';
import {
  CreateLocationDto,
  FileUploadLocationDto,
} from './dto/create-location.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { locationDto } from './dto/location.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudUploadService } from 'src/shared/cloudinaryUpload.service';
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
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
  @Get('/getAllLocation')
  async getAllLocation(@Res() res: Response): Promise<Response<locationDto[]>> {
    try {
      let location = await this.locationService.getAllLocation();
      return res.status(HttpStatus.OK).json({ message: location });
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
  @Post('/createLocation')
  async create(
    @Body() body: CreateLocationDto,
    @Res() res: Response,
  ): Promise<Response<locationDto>> {
    try {
      let result = await this.locationService.postLocation(body);
      return res.status(HttpStatus.CREATED).json({ message: result });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @Get('/searchPaginationLocation')
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
  async searchPaginationLocation(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<locationDto[]>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let NewLocation = await this.locationService.searchPaginationLocation(
        formatPage,
        formatSize,
        keyword,
      );
      return res.status(HttpStatus.OK).json(NewLocation);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
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
    description: 'Deleted location successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get('getLocation/:id')
  async findOneLocation(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<locationDto>> {
    try {
      let Location = await this.locationService.getLocation(parseInt(id, 10));

      return res.status(HttpStatus.OK).json({ Location });
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
    @Body() body: CreateLocationDto,
    @Res() res: Response,
  ): Promise<Response<locationDto>> {
    try {
      let updatedLocation = await this.locationService.UpdateLocation(
        parseInt(id),
        body,
      );
      return res.status(HttpStatus.OK).json({ message: updatedLocation });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server' });
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
  @Delete('deleteLocation/:id')
  async deleteLocation(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<string>> {
    try {
      const data = await this.locationService.deleteLocation(Number(id));

      if (!data) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Location not found' });
      }

      return res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // upload lên cloudinary
  @Post('/upload-location-cloud')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadLocationDto,
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
        'formDatalocation',
      );
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Upload failed' });
    }
  }
}

import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
  Post,
  Body,
  Header,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';
import { comments } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { commentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @Get('/get_all_comments')
  async getAllComments(@Res() res: Response): Promise<Response<comments[]>> {
    try {
      let allComments = await this.commentsService.getAllComment();
      return res.status(HttpStatus.OK).json({ message: allComments });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Post('/post_comment')
  async postComment(
    @Res() res: Response,
    @Body() body: commentDto,
  ): Promise<Response<comments>> {
    try {
      let comment = await this.commentsService.postComment(body);
      return res.status(HttpStatus.OK).json({ message: comment });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Put('/put_comment')
  async putComment(
    @Res() res: Response,
    @Body() body: commentDto,
  ): Promise<Response<comments>> {
    try {
      let comment = await this.commentsService.putComment(body);
      return res.status(HttpStatus.OK).json({ message: comment });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Delete('/delete_comment')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        working_code: { type: 'number', minimum: 1 },
        comment_code: { type: 'number', minimum: 1 },
      },
      required: ['working_code', 'comment_code'],
    },
  })
  async deleteComment(
    @Res() res: Response,
    @Body() body: { working_code: number; comment_code: number },
  ): Promise<Response<string>> {
    try {
      let result = await this.commentsService.deleteComment(body);
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtStrategy'))
  @ApiHeader({ name: 'custom_token', required: false })
  @Get('/get_by_working_code')
  @ApiQuery({ type: Number, required: true, name: 'working_code' })
  async getByWorkingCode(
    @Res() res: Response,
    @Query('working_code') working_code: number,
  ): Promise<Response<comments[]>> {
    try {
      let allComments = await this.commentsService.getByWorkingCode(
        Number(working_code),
      );
      return res.status(HttpStatus.OK).json({ message: allComments });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

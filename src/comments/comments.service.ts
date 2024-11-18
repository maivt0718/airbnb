import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { comments, users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { commentDto } from './dto/comment.dto';
import * as moment from 'moment';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllComment(): Promise<comments[]> {
    try {
      let commentList = await this.prismaService.comments.findMany();
      return commentList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByWorkingCode(working_code: number): Promise<comments[]> {
    try {
      let commentList = await this.prismaService.comments.findMany({where:{
        working_code
      }});
      return commentList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postComment(body: commentDto): Promise<comments> {
    try {
      let { working_code, comment_code, comment_date, description, stars } =
        body;
      let comment = await this.prismaService.comments.create({
        data: {
          comment_code:
            comment_code ||
            Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
          comment_date: comment_date || moment(new Date()).format('YYYY/MM/DD'),
          working_code:
            working_code ||
            Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
          description,
          stars,
        },
      });
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
  async putComment(body: commentDto):Promise<comments>{
    try {
      let { working_code, comment_code, comment_date, description, stars } =
        body;

      let checkComment = await this.prismaService.comments.findFirst({
        where: {
          working_code,
          comment_code,
        },
      });
      if (!checkComment) {
        throw new BadRequestException(
          'Working code or Comment code doesnt exist',
        );
      }
      let comment = await this.prismaService.comments.update({
        where: { id: checkComment.id },
        data: {
          comment_date,
          description,
        },
      });
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteComment(body: any):Promise<string> {
    try {
      let { working_code, comment_code } = body;

      let checkComment = await this.prismaService.comments.findFirst({
        where: {
          working_code,
          comment_code,
        },
      });
      if (!checkComment) {
        throw new NotFoundException(
          'Working code or Comment code doesnt exist',
        );
      }
      await this.prismaService.comments.delete({
        where: { id: checkComment.id },
      });
      return `Comment ${checkComment.id} is deleted`;
    } catch (error) {
      throw new Error(error);
    }
  }
}

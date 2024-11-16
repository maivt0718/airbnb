import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {ApiTags} from "@nestjs/swagger"
import { loginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags(`Authentication session`)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() body: loginDto,
    @Res() res: Response
  ):Promise<Response<string>>{
    try {
      const result = await this.authService.loginAirBNB(body)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
  }
}

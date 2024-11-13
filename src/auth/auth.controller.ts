import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {ApiTags} from "@nestjs/swagger"
import { loginDto } from './dto/login.dto';
import { Response } from 'express';

@ApiTags(`Authentication session`)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() body: loginDto,
    @Res() res: Response
  ):Promise<any>{
    try {
      const result = this.authService.loginAirBNB(body)
      return res.status(HttpStatus.ACCEPTED).json(result)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error})
    }
  }
}

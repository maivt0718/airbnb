import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async loginAirBNB(body: loginDto): Promise<string> {
    try {
      let { email, password } = body;

      let checUser = await this.prisma.users.findFirst({
        where: { email },
      });

      if (!checUser) {
        throw new BadRequestException(`Email is wrong`);
      }

      const checkPassword = checUser.pass_word === password;

      if (!checkPassword) {
        throw new BadRequestException(`Password is wrong`);
      }

      const token = this.jwtService.sign(
        {
          data: {
            userID: checUser.id,
          },
        },
        { expiresIn: '30m', secret: this.configService.get('SECRET_KEY') },
      );
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}

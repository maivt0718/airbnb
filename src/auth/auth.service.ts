import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { signUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { KeyService } from 'src/key/key.services';
@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private keyService: KeyService
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

      const checkPassword = checUser.pass_word === password || bcrypt.compare(password, checUser.pass_word);

      if (!checkPassword) {
        throw new BadRequestException(`Password is wrong`);
      }

      const token = this.jwtService.sign(
        {
          data: {
            userID: checUser.id,
            username: checUser.username
          },
        },
        { expiresIn: '30m', 
          // secret: this.configService.get('SECRET_KEY'), 
          privateKey: this.keyService.getKey('access_token.private.key'),
          algorithm: 'RS256'
        },
      );
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUpAirBNB(body: signUpDto): Promise<string>{
    try {
      let { email, username, password, ...restOfBody } = body
      let checkUser = await this.prisma.users.findFirst({
        where: {
          OR:[
            {email},
            {username}
          ]
        }
      })

      if(checkUser){
        throw new BadRequestException("Email or Username already exists")
      }

      let newUser = await this.prisma.users.create({
        data:{
          email,
          username,
          pass_word: bcrypt.hashSync(password, 10),
          ...restOfBody
        }
      })
      return `User ${newUser.username} is created`
    } catch (error) {
      throw new Error(error)
    }
  }
}

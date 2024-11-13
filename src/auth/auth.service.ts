import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  async loginAirBNB(body: loginDto): Promise<any> {
    try {
      let { email, password } = body;

      let checUser = await this.prisma.users.findFirst({
        where: { email },
      });

      if (!checUser) {
        throw new BadRequestException(`Email is wrong`);
      }

      const checkPassword = checUser.pass_word === password

      if(!checkPassword){
        throw new BadRequestException(`Password is wrong`);
      }
      return 'token'
    } catch (error) {
      throw new Error(error)
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
  constructor(
    config: ConfigService,
    private readonly PrismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader('custom_token'),ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate(tokenDecode: any) {
    console.log(tokenDecode);
    let checkUser = await this.PrismaService.users.findFirst({
      where: {
        username: tokenDecode.username,
        id: tokenDecode.id,
      },
    });

    if (!checkUser) {
      return false;
    }
    return tokenDecode;
  }
}

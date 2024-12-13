import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { KeyService } from 'src/key/key.services';
import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
//   constructor(
//     config: ConfigService,
//     private readonly PrismaService: PrismaService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader('custom_token'),ExtractJwt.fromAuthHeaderAsBearerToken()]),
//       ignoreExpiration: false,
//       secretOrKey: config.get('SECRET_KEY'),
//     });
//   }
//   async validate(tokenDecode: any) {
//     let checkUser = await this.PrismaService.users.findFirst({
//       where: {
//         username: tokenDecode.username,
//         id: tokenDecode.id,
//       },
//     });

//     if (!checkUser) {
//       return false;
//     }
//     return tokenDecode;
//   }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
  constructor(
    config: ConfigService,
    private readonly PrismaService: PrismaService,
    keyService: KeyService
  ) {
    const publicKey = keyService.getKey('access_token.public.key')
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader('custom_token'),ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: ['RS256']
    });
  }
  async validate(tokenDecode: any) {
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

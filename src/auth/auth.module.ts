import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeyModule } from 'src/key/key.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  imports: [JwtModule.register({}), KeyModule],
})
export class AuthModule {}

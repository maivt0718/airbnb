import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { KeyModule } from 'src/key/key.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, JwtStrategy],
  imports: [KeyModule]
})
export class CommentsModule {}

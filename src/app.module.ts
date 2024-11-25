import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { RoomModule } from './rooms/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { SharedModule } from './shared/shared.module';
import { BookRoomModule } from './book_room/book_room.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommentsModule,
    RoomModule,
    PrismaModule,
    SharedModule,
    BookRoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

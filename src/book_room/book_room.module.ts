import { Module } from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import { BookRoomController } from './book_room.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [BookRoomController],
  providers: [BookRoomService, PrismaService],
  imports: [SharedModule]
})
export class BookRoomModule {}

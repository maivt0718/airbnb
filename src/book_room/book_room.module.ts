import { Module } from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import { BookRoomController } from './book_room.controller';

@Module({
  controllers: [BookRoomController],
  providers: [BookRoomService],
})
export class BookRoomModule {}

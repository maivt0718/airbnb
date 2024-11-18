import { Controller, Get } from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Book room session")
@Controller('book-room')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  
}

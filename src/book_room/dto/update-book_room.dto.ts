import { PartialType } from '@nestjs/swagger';
import { CreateBookRoomDto } from './create-book_room.dto';

export class UpdateBookRoomDto extends PartialType(CreateBookRoomDto) {}

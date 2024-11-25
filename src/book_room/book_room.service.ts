import { Injectable } from '@nestjs/common';
import { CreateBookRoomDto } from './dto/create-book_room.dto';
import { UpdateBookRoomDto } from './dto/update-book_room.dto';

@Injectable()
export class BookRoomService {
  create(createBookRoomDto: CreateBookRoomDto) {
    return 'This action adds a new bookRoom';
  }

  findAll() {
    return `This action returns all bookRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookRoom`;
  }

  update(id: number, updateBookRoomDto: UpdateBookRoomDto) {
    return `This action updates a #${id} bookRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookRoom`;
  }
}

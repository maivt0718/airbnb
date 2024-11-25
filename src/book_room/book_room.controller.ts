import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import { CreateBookRoomDto } from './dto/create-book_room.dto';
import { UpdateBookRoomDto } from './dto/update-book_room.dto';

@Controller('book-room')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  @Post()
  create(@Body() createBookRoomDto: CreateBookRoomDto) {
    return this.bookRoomService.create(createBookRoomDto);
  }

  @Get()
  findAll() {
    return this.bookRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookRoomDto: UpdateBookRoomDto) {
    return this.bookRoomService.update(+id, updateBookRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookRoomService.remove(+id);
  }
}

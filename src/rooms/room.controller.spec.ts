import { Test, TestingModule } from '@nestjs/testing';
import { BookRoomController } from './room.controller';
import { BookRoomService } from './room.service';

describe('BookRoomController', () => {
  let controller: BookRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookRoomController],
      providers: [BookRoomService],
    }).compile();

    controller = module.get<BookRoomController>(BookRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

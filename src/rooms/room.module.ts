import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
  imports: [SharedModule]
})
export class RoomModule {}

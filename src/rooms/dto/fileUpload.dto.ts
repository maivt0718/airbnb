import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, MaxLength } from 'class-validator';

export class filesUploadDto {
  @ApiProperty({
    type: 'array',
    maxItems: 1,
    items: {
      format: 'binary',
      type: 'string',
    },
  })
  @IsArray()
  @ArrayMaxSize(1, {message: "Maximum is 1"})
  images: Express.Multer.File[];

  @ApiProperty({name: "RoomID", type: "string", required: false, description: "Optional: RoomID"})
  RoomID: string
}

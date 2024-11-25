import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class roomDto {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  room_name: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  passenger_id: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumberString()
  room_number: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumberString()
  bed: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumberString()
  bathroom: number;

  @ApiProperty({ default: '', required: false })
  @IsString()
  description: string;

  @ApiProperty({ default: 0 })
  @IsNumberString()
  price: number;

  @ApiProperty({ default: false })
  @IsBooleanString()
  laundry: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  iron: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  television: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  air_conditioner: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  wifi: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  stove: boolean;

  @ApiProperty({ default: false })
  @IsBooleanString()
  parking: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Array of image files (optional)',
    required: false,
  })
  @IsOptional()
  images?: Express.Multer.File[];

  @ApiProperty({ default: 1 })
  @IsNumberString()
  location_id: number;

  
}

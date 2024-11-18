import { ApiProperty } from '@nestjs/swagger';
import { users_gender } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  Matches,
} from 'class-validator';

export class signUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(users_gender)
  @IsNotEmpty()
  @ApiProperty({ enum: users_gender })
  gender: users_gender;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/, {
    message: 'Birthday must be in the format YYYY/MM/DD',
  })
  birthday: string;

  @ApiProperty()
  role: string;
}

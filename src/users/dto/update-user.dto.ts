import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { users_gender } from '@prisma/client';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'username Không được để trống' })
  @ApiProperty()
  username: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Phone không được để trống' })
  @ApiProperty()
  phone: string;

  @IsNotEmpty({ message: 'Birthday không được để trống' })
  @ApiProperty()
  birthday: string;

  @IsNotEmpty({ message: 'gender không được để trống' })
  @ApiProperty()
  gender: users_gender;

  @IsNotEmpty({ message: 'role không được để trống' })
  @ApiProperty()
  role: string;
}

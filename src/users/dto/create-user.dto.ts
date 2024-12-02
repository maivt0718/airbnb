import { GenderUser } from './../enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { users_gender } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username Không được để trống' })
  @ApiProperty()
  username: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @ApiProperty()
  pass_word: string;

  @IsNotEmpty({ message: 'Phone không được để trống' })
  @ApiProperty()
  phone: string;

  @IsNotEmpty({ message: 'Birthday không được để trống' })
  @ApiProperty()
  birthday: string;

  @IsNotEmpty({ message: 'gender không được để trống' })
  @IsEnum(GenderUser)
  @ApiProperty()
  gender: users_gender; // Change the type of gender to users_gender

  @IsNotEmpty({ message: 'role không được để trống' })
  @ApiProperty()
  role: string;
}

// upload một hình
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  formFile: any; // file tải lên
}

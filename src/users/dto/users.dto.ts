// import { users_gender } from '@prisma/client';
import { Expose } from 'class-transformer';

export class usersDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  pass_word: string;
  @Expose()
  phone: string;
  @Expose()
  birthday: string;
  @Expose()
  // gender: users_gender
  gender: string;
  @Expose()
  role: string;

  // tạo object mà tất cả các attribute đều là optional
  constructor(partial: Partial<usersDto>) {
    Object.assign(this, partial);
  }
}

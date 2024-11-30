import { users_gender } from '@prisma/client';
import { Expose } from 'class-transformer';

export class usersDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  password: string;
  @Expose()
  phone: string;
  @Expose()
  birthday: string;
  @Expose()
  gender: users_gender;
  @Expose()
  role: string;

  // tạo object mà tất cả các attribute đều là optional
  constructor(partial: Partial<usersDto>) {
    Object.assign(this, partial);
  }
}

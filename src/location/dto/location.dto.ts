import { Expose } from 'class-transformer';

export class locationDto {
  @Expose()
  id: number;
  @Expose()
  location_name: string;
  @Expose()
  province: string;
  @Expose()
  country: string;
  @Expose()
  images: string;

  constructor(partial: Partial<locationDto>) {
    Object.assign(this, partial);
  }
}

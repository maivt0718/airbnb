import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'username Không được để trống' })
  @ApiProperty()
  location_name: string;

  @IsNotEmpty({ message: 'province Không được để trống' })
  @ApiProperty()
  province: string;

  @IsNotEmpty({ message: 'country Không được để trống' })
  @ApiProperty()
  country: string;

  @IsNotEmpty({ message: 'images Không được để trống' })
  @ApiProperty()
  images: string;
}
// upload một hình
export class FileUploadLocationDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  formFile: any; // file tải lên
}

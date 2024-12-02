import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryUploadService } from './cloudinary.service';
import { CloudUploadService } from './cloudinaryUpload.service';

@Module({
  imports: [CloudinaryModule],
  providers: [CloudinaryUploadService, CloudUploadService],
  exports: [CloudinaryUploadService, CloudUploadService],
})
export class SharedModule {}

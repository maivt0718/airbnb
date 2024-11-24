import { Module } from '@nestjs/common';
import { CloudinaryConfig } from './cloudinary.config';
import { cloudinaryProvider } from './cloudinary.provider';

@Module({
    providers: [CloudinaryConfig, cloudinaryProvider],
    exports: [cloudinaryProvider]
})
export class CloudinaryModule {}

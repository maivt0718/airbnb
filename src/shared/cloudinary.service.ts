import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { error } from 'console';

@Injectable()
export class CloudinaryUploadService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinary) {}

  async uploadDocument(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = this.cloudinary.uploader.upload_stream(
            { folder }, 
            (error: any, result: UploadApiResponse) => {
              error ? reject(error) : resolve(result);
            },
          );
          uploadStream.end(file.buffer);
        }),
    );
    return Promise.all(uploadPromises);
  }
}

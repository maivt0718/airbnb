import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: () => cloudinary
}
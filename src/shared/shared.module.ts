import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { CloudinaryUploadService } from "./cloudinary.service";


@Module({
    imports: [CloudinaryModule],
    providers: [CloudinaryUploadService],
    exports: [CloudinaryUploadService]
})

export class SharedModule{}

import { Module } from "@nestjs/common";
import { KeyService } from "./key.services";

@Module({
    providers: [KeyService],
    exports: [KeyService]
})
export class KeyModule{}
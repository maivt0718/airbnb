import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import {ApiProperty} from "@nestjs/swagger"

export class loginDto{
    @IsEmail({}, {message: "Must be under the email format"})
    @ApiProperty()
    email: string

    @IsNotEmpty({message: "Password is not empty"})
    @ApiProperty()
    password: string
}
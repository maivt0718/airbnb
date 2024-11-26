import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class BookRoomDto{
    @IsNumber()
    @ApiProperty({required: true})
    room_id: number

    @IsNumber()
    @ApiProperty({required: true})
    quantity_of_people: number

    @IsNumber()
    @ApiProperty({required: true})
    booking_user: number

    @ApiProperty({required: false, default: new Date().toISOString()})
    check_in_datetime: string

    @ApiProperty({required: false, default: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString() })
    check_out_datetime: string
}
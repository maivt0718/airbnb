import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class roomDto{
    @ApiProperty({default: ""})
    @IsNotEmpty()
    room_name: string

    @ApiProperty({default: 1})
    @IsNotEmpty()
    passenger_id: number

    @ApiProperty({default: 1})
    @IsNotEmpty()
    @IsNumber()
    room_number: number

    @ApiProperty({default: 1})
    @IsNotEmpty()
    @IsInt()
    @Max(3)
    @Min(1)
    bed: number

    @ApiProperty({default: 1})
    @IsNotEmpty()
    @IsInt()
    @Max(3)
    @Min(1)
    bathroom: number

    @ApiProperty({default: ""})
    @IsString()
    description:  string

    @ApiProperty({default: 0})
    @IsInt()
    price: number

    @ApiProperty({default: false})
    @IsBoolean()
    laundry: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    iron: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    television: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    air_conditioner: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    wifi: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    stove: boolean

    @ApiProperty({default: false})
    @IsBoolean()
    parking: boolean

    @ApiProperty({default: ""})
    @IsString()
    images: string

    @ApiProperty({default:1})
    @IsInt()
    location_id: number
}
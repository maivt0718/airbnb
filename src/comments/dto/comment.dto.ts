import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Matches, Max, Min } from 'class-validator';
import * as moment from 'moment';

export class commentDto {
  @ApiProperty({default: Math.floor(Math.random()*99999) + 1})
  @IsNumber( {},{ message: 'Number must be integer' })
  working_code: number;

  @ApiProperty({default: Math.floor(Math.random()*99999) + 1})
  @IsNumber({},{ message: 'Number must be integer' })
  comment_code: number;

  @IsNotEmpty()
  @ApiProperty({default: new Date().toISOString()})
  @Matches(/^(\d{4})\-(\d{1,2})\-(\d{1,2}).*/, {
    message: 'Comment Date must be in the format YYYY-MM-DD',
  })
  comment_date: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @ApiProperty({default: 1})
  @IsInt({message: "Star must be an integer"})
  @Min(1)
  @Max(5)
  stars: number;
}

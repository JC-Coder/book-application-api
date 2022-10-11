import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

  @ApiProperty({
    description: 'Writer of the book',
    example: 'Apostle Suliman',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Describe content of the book',
    example: 'it is about a Snake Girl',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Date of book Publishment',
    example: '22nd MAY, 1994',
  })
  @IsNotEmpty()
  datePublished: string;

  @ApiProperty({
    description: 'Section of the book',
    example: 'Literature',
  })
  @IsNotEmpty()
  category: string;
}
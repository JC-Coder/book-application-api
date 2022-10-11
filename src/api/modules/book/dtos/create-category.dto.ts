import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Book } from "../entities/book.entity";

export class CreateBookCategoryDto {
  @ApiProperty({
    description: 'the name of a category',
    example: `Weddlock`,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  books: Book[];
}
import { IsNotEmpty, IsString } from "class-validator";
import { Book } from "../entities/book.entity";

export class CreateBookCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;


    books: Book[];
}
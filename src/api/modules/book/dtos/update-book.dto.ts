import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateBookDto {
    @ApiProperty({
        description: 'Title of the book',
        example: 'The lion king',
    })
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Writer of the book',
        example: 'Apostle Suliman',
    })
    @IsOptional()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        description: 'Describe content of the book',
        example: 'it is about a Snake Girl',
    })
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Date of book Publishment',
        example: '22nd MAY, 1994',
    })
    @IsOptional()
    @IsNotEmpty()
    datePublished: string;

    @ApiProperty({
        description: 'Section of the book',
        example: 'Literature',
    })
    @IsOptional()
    @IsNotEmpty()
    category: string;
}
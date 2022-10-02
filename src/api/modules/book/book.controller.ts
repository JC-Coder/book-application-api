import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    // create new book 
    @Post('/create')
    async createBook(@Body() book: CreateBookDto): Promise<any>{
        return await this.bookService.createBook(book);
    }

    // get all books
    @Get('/all')
    async findAll(){
        return await this.bookService.findAll();
    }

    // get book via id 
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number){
        return await this.bookService.findOne(id);
    }

    // update book via id
    @Put('/update/:id')
    async updateBook(@Param('id', ParseIntPipe) id: number,@Body() book: UpdateBookDto){
        return await this.bookService.updateBook(id, book);
    }

    // delete book via id 
    @Delete('/:id')
    async deleteOne(@Param('id', ParseIntPipe) id: number){
        return await this.bookService.deleteOne(id);
    }
}

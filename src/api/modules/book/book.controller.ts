import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';
import {Pagination} from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { CreateBookCategoryDto } from './dtos/create-category.dto';
import { hasRole } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    // create new book 
    @Post('/create')
    async createBook(@Body() book: CreateBookDto): Promise<any>{
        return await this.bookService.createBook(book);
    }

    // add / update book image
    @Put('upload/image/:bookId')
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: './uploads/images',
                filename:  (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                  }
            })
        })
    )
    async addBookImage(@UploadedFile() file: Express.Multer.File, @Param('bookId', ParseIntPipe) bookId: number){
        return await this.bookService.addBookImage(file, bookId);
    }

    // add / update book file (downloadable pdf)
    @Put('upload/pdf/:bookId')
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: './uploads/pdf',
                filename:  (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                  }
            })
        })
    )
    async addBookPdf(@UploadedFile() file: Express.Multer.File, @Param('bookId', ParseIntPipe) bookId: number){
        return await this.bookService.addBookPdf(file, bookId);
    }


    // get all books
    @hasRole('admin')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('/all')
    async findAll(){
        return await this.bookService.findAll();
    }

    // get books via pagination
    @Get('all/paginate')
    async bookPaginate(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10): Promise<Pagination<Book>> {
      limit = limit > 100 ? 100 : limit;
      return this.bookService.bookPaginate({
        page,
        limit,
      });
    }

    // get book via id 
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number){
        return await this.bookService.findOne(id);
    }

    // get books via category 
    @Get('/category/:categoryName')
    async findByCategory(@Param('categoryName') categoryName: string){
        return this.bookService.findByCategory(categoryName);
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


    // add new book category
    @Post('/category/create')
    async createCategory(@Body() categoryPayload: CreateBookCategoryDto){
        return await this.bookService.createCategory(categoryPayload)
    }
}



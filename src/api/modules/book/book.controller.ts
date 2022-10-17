import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';
import {Pagination} from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { hasRole } from '../auth/decorators/role.decorators';
import { JwtAuthGuard } from '../auth/Guards/authGuard';
import { RolesGuard } from '../auth/Guards/roleguard';
import {  ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateBookCategoryDto } from './dtos/create-category.dto';


@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  // create new book
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Book })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('/create')
  async createBook(@Body() book: CreateBookDto, @Response() res): Promise<any> {
    console.log(await res.user);
    return await this.bookService.createBook(book);
  }

  // add / update book image
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'The resource was Uploaded successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @Put('upload/image/:bookId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )

  // add book images
  async addBookImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return await this.bookService.addBookImage(file, bookId);
  }

  // add / update book file (downloadable pdf)
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'The resource was uploaded successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @Put('upload/pdf/:bookId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdf',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addBookPdf(
    @UploadedFile() file: Express.Multer.File,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return await this.bookService.addBookPdf(file, bookId);
  }

  // get all books

  @Get('/all')
  @ApiOkResponse({ description: 'All resource Response successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findAll() {
    return await this.bookService.findAll();
  }

  // get books via pagination
  @Get('all/paginate')
  @ApiOkResponse({ description: 'All resource Response successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async bookPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Book>> {
    limit = limit > 100 ? 100 : limit;
    return this.bookService.bookPaginate({
      page,
      limit,
    });
  }

  // get book via id
  @Get('/:id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.findOne(id);
  }

  // get books via category
  @Get('/category/:categoryName')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findByCategory(@Param('categoryName') categoryName: string) {
    return this.bookService.findByCategory(categoryName);
  }

  // update book via id
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: ' resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @Put('/update/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() book: UpdateBookDto,
  ) {
    return await this.bookService.updateBook(id, book);
  }

  // delete book via id
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.deleteOne(id);
  }

  // add new book category
  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBearerAuth('access-token')
  @Post('/category/create')
  async createCategory(@Body() categoryPayload: CreateBookCategoryDto) {
    return await this.bookService.createCategory(categoryPayload);
  }
}



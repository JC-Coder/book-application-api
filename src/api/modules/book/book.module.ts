import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookCategory } from './entities/book-category.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookCategory])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}

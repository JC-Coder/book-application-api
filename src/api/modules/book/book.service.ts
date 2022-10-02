import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';
import { Book } from './entities/book.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>, @InjectRepository(BookCategory) private categoryRepository: Repository<BookCategory>){}


    // create new book 
    async createBook(book): Promise<any>{
        let {category } = book;
        let catExist = await this.findCategory(category);

        if(catExist == false){
            throw new NotFoundException('category not found, check input or create a new category');
        }

        let newBook = book;
        newBook.category = catExist;

        return  await this.bookRepository.save(newBook);
    }

    // find category by name
    async findCategory(name){
        let result = await this.categoryRepository.findOne({
            where: {name: name}
        })

        if(!result){
            return false;
        }

        return result;
    }

    
    // find all books 
    async findAll(){
        return this.bookRepository.find();
    }

    //  get books via pagination
    async bookPaginate(options: IPaginationOptions): Promise<Pagination<Book>> {
        return await paginate<Book>(this.bookRepository, options);
    }


    // get book via id
    async findOne(id): Promise<Book | object> {
        let result = await this.bookRepository.findOne({
            where: {id: id}
        })

        if(!result) throw new NotFoundException(`Book with id ${id} not found `);

        return result;
    }


    // get books via category 
    async findByCategory(category): Promise<BookCategory>{
        let result = await this.categoryRepository.findOne({
            where: {name: category},
            relations: ['books']
        })

        if(!result ) throw new NotFoundException(`category ${category} not found`)

        return result;
    }


    //update book via id 
    async updateBook(id, book): Promise<UpdateResult> {
        let {category} = book;
        let catExist = await this.findCategory(category);

        if(catExist == false){
            throw new NotFoundException('category not found, check input or create a new category');
        }

        let newBook = book;
        newBook.category = catExist;

        let result = await this.bookRepository.update(id, newBook);

        if(result.affected == 0) throw new NotFoundException(`Book with id ${id} not found`)

        return result;
    }


    // delete book via id 
    async deleteOne(id): Promise<DeleteResult> {
        let result = await this.bookRepository.delete(id);

        if(result.affected == 0) throw new NotFoundException(`Book with id ${id} not found`);

        return result;
    }

}
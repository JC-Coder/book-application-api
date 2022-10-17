import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';
import { Book } from './entities/book.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import * as fs from 'fs';

@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>, @InjectRepository(BookCategory) private categoryRepository: Repository<BookCategory>){}


    // create new book 
    async createBook(book): Promise<any>{
        let {category } = book;
        let catExist = await this.findCategory(category);

        if(catExist == false){
            throw new NotFoundException('category not found, check request or create a new category');
        }

        let newBook = book;
        newBook.category = catExist;

        return  await this.bookRepository.save(newBook);
    }


    // add / update book image 
    async addBookImage(file: Express.Multer.File, bookId): Promise<any> {
        let bookExist = await this.bookRepository.findOne({
            where: {id: bookId}
        })

        // check filetype 
        let condition = /^\w+.(jpg|png|jpeg)$/

        if(!file.filename.match(condition)){
            // remove uploaded image
            fs.unlink(`./uploads/images/${file.filename}`, (err) => {
                if(err) return err;
            });

            throw new BadRequestException('Uploaded file should be of type png,jpg,jpeg only')
        }

        if(!bookExist){
            // remove uploaded image
            fs.unlink(`./uploads/images/${file.filename}`, (err) => {
                if(err) return err;
            });

            throw new NotFoundException(`Book with id ${bookId} not found`);

        } else {
            // check if book exist and  already have image 
            if(bookExist.bookImage){
                // remove previous image and save the new one 
                fs.unlink(`./uploads/images/${bookExist.bookImage}`,(err) => {
                    if(err) throw err;
                })
            }

            // add image to book
            let newBook = bookExist;
            newBook.bookImage = file.filename;

            let result = await this.bookRepository.update(bookId, newBook);

            return {result, message: "Book image updated successully"}
        }
    }


    // add / update book file (downloadable pdf)
    async addBookPdf(file: Express.Multer.File, bookId): Promise<any> {
        let bookExist = await this.bookRepository.findOne({
            where: {id: bookId}
        })

         // check filetype 
         let condition = /^\w+.(pdf)$/

         if(!file.filename.match(condition)){
             // remove uploaded file
             fs.unlink(`./uploads/pdf/${file.filename}`, (err) => {
                 if(err) return err;
             });
 
             throw new BadRequestException('Uploaded file should be of type pdf only');
         }

        if(!bookExist){
            // remove uploaded book Pdf
            fs.unlink(`./uploads/pdf/${file.filename}`, (err) => {
                if(err) return err;
            });

            throw new NotFoundException(`Book with id ${bookId} not found`);

        } else {
            // check if book exist and  already have a file (pdf) 
            if(bookExist.bookFile){
                // remove previous file(pdf) and save the new one 
                fs.unlink(`./uploads/pdf/${bookExist.bookFile}`,(err) => {
                    if(err) throw err;
                })
            }

            // add file(pdf) to book
            let newBook = bookExist;
            newBook.bookFile = file.filename;

            let result = await this.bookRepository.update(bookId, newBook);

            return {result, message: "Book pdf file updated successully"}
        }
    }


    // delete book image 
    async deleteBookImage(filename){
        fs.unlink(`./uploads/images/${filename}`, (err) => {
            if(err) throw err;
        })
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
    async findOne(id): Promise<Book> {
        let result = await this.bookRepository.findOne({
            where: {id: id}
        })

        if(!result) throw new NotFoundException(`Book with id ${id} not found `);

        return result;
    }


    // get books via category 
    async findByCategory(category): Promise<BookCategory>{
       // this will return all books in a particular category and get total items count 
       let result = await this.categoryRepository.createQueryBuilder('c').where('c.name = :category', {category: category}).leftJoinAndSelect('c.books', 'cb').loadRelationCountAndMap('c.totalBooks', 'c.books').getOne();

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
        let bookToDelete = await this.bookRepository.findOne({
            where: {id: id}
        });
        let result = await this.bookRepository.delete(id);

        if(result.affected == 0) throw new NotFoundException(`Book with id ${id} not found`);

        // check if book have image 
        if(bookToDelete.bookImage){
            fs.unlink(`./uploads/images/${bookToDelete.bookImage}`,(err) => {
                if(err) throw err;
            })
        }

        // check if book have pdf
         if(bookToDelete.bookFile){
            fs.unlink(`./uploads/pdf/${bookToDelete.bookFile}`,(err) => {
                if(err) throw err;
            })
        }

        return result;
    }


    // add new book category 
    async createCategory(categoryPayload): Promise<BookCategory>{
        return await this.categoryRepository.save(categoryPayload);
    }

}
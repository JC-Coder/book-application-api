import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookCategory } from "./book-category.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column()
    datePublished: string;

    @ManyToOne(() =>  BookCategory, (bookCategory) => bookCategory.books)
    category: BookCategory;

    @Column({default: null})
    ownerId: number;

    @Column({default: null})
    bookImage: string;

    @Column({default: null})
    bookFile: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
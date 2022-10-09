import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookCategory } from "./book-category.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Primary Key as UserID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Title of the book', example: 'The Snake Girl' })
  title: string;

  @Column()
  @ApiProperty({
    description: 'Writer of the book',
    example: 'Apostle Suliman',
  })
  author: string;

  @Column()
  @ApiProperty({
    description: 'Describe content of the book',
    example: 'it is about a Snake Girl',
  })
  description: string;

  @Column()
  @ApiProperty({
    description: 'Date of book Publishment',
    example: '22nd MAY, 1994',
  })
  datePublished: string;


  @ManyToOne(() => BookCategory, (bookCategory) => bookCategory.books, {
    onDelete: 'CASCADE',
  })
  category: BookCategory;

  @Column({ default: null })
  ownerId: number;

  @Column({ default: null })
  bookImage: string;

  @Column({ default: null })
  bookFile: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'When book was Created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'When book was updated',
  })
  updatedAt: Date;
}
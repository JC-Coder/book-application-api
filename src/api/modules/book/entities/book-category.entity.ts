import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookCategory {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Primary generated userId',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'name of book',
    example: 'heart books',
  })
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date of book created',
    
  })
  createdAt: Date;
}
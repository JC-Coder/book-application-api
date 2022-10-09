import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Primary generated userId',
    example: 1,
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'User Full Nmae',
    example: 'Peter Etim',
  })
  username: string;

  @ApiProperty({
    description: 'User Correct Email address',
    example: 'mike@gmail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Peter@1234',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'User Role',
    example: 'admin',
  })
  @Column({ default: 'user' })
  role: string;
}

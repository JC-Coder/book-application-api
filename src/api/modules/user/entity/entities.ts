import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Primary generated userId',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'User First Name',
    example: 'Peter',
  })
  firstName: string;


  @Column()
  @ApiProperty({
    description: 'User Last Name',
    example: 'Etim',
  })
  lastName: string;

  @ApiProperty({
    description: 'User Correct Email address',
    example: 'peter@gmail.com',
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
    description: 'User Confirm password',
    example: 'Peter@1234',
  })
  @Column()
  confirmPassword: string;

  @ApiProperty({
    description: 'User Role',
    default: 'user',
  })
  @Column({ default: 'user' })
  role: string;
}

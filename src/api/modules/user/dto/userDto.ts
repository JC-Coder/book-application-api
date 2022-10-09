import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Messages, Regex } from '../util/utilfile';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Full Nmae',
    example: 'Peter Etim',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'User Correct Email address',
    example: 'mike@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Peter@1234',
  })
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(Regex.password, { message: Messages.passwordMessage })
  password: string;

  @ApiProperty({
    description: 'User Role',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;
}

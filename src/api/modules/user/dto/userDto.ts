import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
    description: 'User First Name',
    example: 'Peter',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Etim',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User Correct Email address',
    example: 'peter@gmail.com',
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
    description: 'User Confirm password',
    example: 'Peter@1234',
  })
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(Regex.password, { message: Messages.passwordMessage })
  confirmPassword: string;

  @ApiPropertyOptional({
    description: 'This is an optional property for User Role',
    default:"user",
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;
}

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
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 12)
  @Matches(Regex.password, { message: Messages.passwordMessage })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;
}

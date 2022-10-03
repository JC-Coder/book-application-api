import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Messages, Regex } from '../util/utilfile';

export class UserDto {
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
  role: string;
}

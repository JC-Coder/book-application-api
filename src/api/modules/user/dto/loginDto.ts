import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User Email address', example: 'joskdkdeph@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User Password', example: 'Joseph@11111' })
  @IsNotEmpty()
  password: string;
}

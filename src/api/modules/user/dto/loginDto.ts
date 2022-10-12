import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User Email address', example: 'mike@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User Password', example: 'Mike@1234' })
  @IsNotEmpty()
  password: string;
}

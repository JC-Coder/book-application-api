import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactMessageDto {
  @ApiProperty({
    description: 'the name of a contact',
    example: `victor Moses`,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'the email address of a contact',
    example: `victor@gmail.com`,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'the phone Number of a contact',
    example: `0806547890`,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'the contact message',
    example: `i will love to place an order`,
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
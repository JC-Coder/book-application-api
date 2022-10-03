import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactMessageDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
import { IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    nickname!: string;

    @IsString()
    password!: string;
}
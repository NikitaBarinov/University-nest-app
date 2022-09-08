import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}
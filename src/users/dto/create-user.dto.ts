import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length, IsMobilePhone, IsDate,} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'roflman32', description: 'User name'})
    @IsString({message: 'Должно быть строкой'})
    readonly username: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;

    @ApiProperty({example: '89232332345', description: 'Phone number of user'})
    @IsMobilePhone() 
    readonly phone: string;

    @ApiProperty({example: '10.02.1998', description: 'Birthday date of user'})
    @IsDate()
    readonly dateOfBirth: Date;

    @ApiProperty({example: 'male', description: 'User gender'})
    @IsString({message: 'Must be a string'})
    readonly sex: string;
}
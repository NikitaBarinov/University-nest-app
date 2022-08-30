import {BelongsToMany, Column, DataType, HasMany, Model, Table,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Profile } from "src/profile/profile.model";

interface UserCreationAttrs {
    username: string;
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'podpivas777', description: 'User name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;
 
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: '89232332345', description: 'Phone number'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone: string;

    @ApiProperty({example: '1999-06-15', description: 'Date of user birthday'})
    @Column({type: DataType.DATE, allowNull: false})
    dateOfBirth: Date;

    @ApiProperty({example: 'male', description: 'Gender of user'})
    @Column({type: DataType.STRING, allowNull: false})
    sex: string;

    @HasMany(() => Profile)
    profiles: Profile[];
}

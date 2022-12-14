import {IsNumber, IsString} from "class-validator";

export class ChangeProfileDto {
    @IsString({message: "Должно быть строкой"})
    readonly faculty: string;
    @IsString({message: "Должно быть строкой"})
    readonly university: string;
    @IsString({message: "Должно быть строкой"})
    readonly group?: string;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly profileId: number;
}

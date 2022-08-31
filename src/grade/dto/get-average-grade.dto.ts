import {IsNumber, IsString} from "class-validator";

export class GetAverageGradeDto {
    @IsString({message: "Должно быть строкой"})
    readonly faculty?: string;
    
    @IsString({message: "Должно быть строкой"})
    readonly group?: string;

    @IsString({message: "Должно быть строкой"})
    readonly lesson?: string;
    
    @IsString({message: "Должно быть строкой"})
    readonly university?: string;

    @IsNumber({}, {message: "Должно быть числом"})
    readonly studentId?: number;

    @IsNumber({}, {message: "Должно быть числом"})
    readonly senderId: number;
}
import {IsNumber, IsString} from "class-validator";

export class createGradeDto {
    @IsNumber({}, {message: "Должно быть числом"})
    readonly studentId: number;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly teacherId: number;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly grade: number;
    @IsString({message: "Должно быть строкой"})
    readonly lesson: string;
}
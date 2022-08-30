import {IsNumber} from "class-validator";

export class UpdateGradeDto {
    @IsNumber({}, {message: "Должно быть числом"})
    readonly gradeId: number;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly grade: number;
}
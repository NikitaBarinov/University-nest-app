import {IsNumber, IsString} from "class-validator";

export class GetAverageGradeDto {
    @IsString({message: "Должно быть строкой"})
    readonly faculty?: string;
    @IsString({message: "Должно быть строкой"})
    readonly groupId?: string;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly studentId?: number;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly teacherId: number;
}
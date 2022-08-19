import {IsNumber, IsString} from "class-validator";

export class CreateProfileDto {
    @IsNumber({}, {message: "Must be a number"})
    readonly userId: number;

    @IsString({message: "Must be a string"})
    readonly faculty: string;

    @IsString({message: "Must be a string"})
    readonly university: string;

    @IsNumber({}, {message: "Must be a number"})
    readonly group: string;
}

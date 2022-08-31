import {
    BelongsTo,
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
  import { ApiProperty } from "@nestjs/swagger";
  import { User } from "src/users/users.model";
import { Profile } from "src/profile/profile.model";
  
  interface GradeCreationAttrs {
    studentId: number;
    teacherId: number;
    grade: number;
    lesson: string;
  }
  
  @Table({ tableName: "grades" })
  export class Grade extends Model<Grade, GradeCreationAttrs> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @ApiProperty({ example: "1", description: "Id of student which got grade" })
    @ForeignKey(() => Profile)
    @Column({ type: DataType.INTEGER })
    studentId: number;

    @ApiProperty({ example: "1", description: "Id of teacher which create grade" })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    teacherId: number;

    @ApiProperty({ example: "5", description: "Assessment of student" })
    @Column({ type: DataType.INTEGER, allowNull: true })
    grade: number;

    @ApiProperty({ example: "Information technologies", description: "Name of lesson" })
    @Column({ type: DataType.STRING, allowNull: true })
    lesson: string;
  }
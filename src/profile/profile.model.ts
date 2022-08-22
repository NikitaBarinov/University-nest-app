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

interface ProfileCreationAttrs {
  userId: number;
  faculty: string;
  university: string;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Industrial electronic",
    description: "Name of faculty",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  faculty: string;

  @ApiProperty({ example: "TUSUR", description: "Name of university" })
  @Column({ type: DataType.STRING, allowNull: false })
  university: string;

  @ApiProperty({ example: "352-1", description: "Group id" })
  @Column({ type: DataType.STRING, allowNull: true })
  group: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // @BelongsTo(() => User)
  // author: User;
}

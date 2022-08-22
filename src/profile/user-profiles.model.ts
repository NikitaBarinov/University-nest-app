import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Profile } from "./profile.model";

@Table({tableName: 'user_profiles', createdAt: false, updatedAt: false})
export class UserProfiles extends Model<UserProfiles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Profile)
    @Column({type: DataType.INTEGER})
    profileId: number;

    @Column({type: DataType.INTEGER})
    userId: number;
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async updateUser(dto: CreateUserDto, userId: number) {
    console.log("userID", userId);
    const user = await this.userRepository.findByPk(userId);
    console.log("user",user);
    
    if(user){
      user.username = dto.username;
      user.password = await bcrypt.hash(dto.password, 5);
      user.phone = dto.phone;
      user.dateOfBirth = dto.dateOfBirth;
      user.sex = dto.sex;
      await user.save();
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    });

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    });
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone }
    });
    return user;
  }
}

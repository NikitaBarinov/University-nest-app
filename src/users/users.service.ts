import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ProfileService } from "src/profile/profile.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private profileService: ProfileService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
      include: { all: true },
    });
    return user;
  }

  // async addProfile(dto: AddProfileDto) {
  //   const user = await this.userRepository.findByPk(dto.userId);
  //   if (user) {
  //     const profile = await this.profileService.createProfile(dto);
  //     await user.$add("profile", profile.id);
  //     return dto;
  //   }
  //   throw new HttpException(
  //     "Пользователь или роль не найдены",
  //     HttpStatus.NOT_FOUND
  //   );
  // }
}

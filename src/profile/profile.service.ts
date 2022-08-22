import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AddProfileDto } from "src/users/dto/add-profile.dto";
import { UsersService } from "src/users/users.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}

  async createProfile(dto: AddProfileDto) {
    const profile = await this.profileRepository.create(dto);
    // const user = await this.userService.getUserByEmail();
    return profile;
  }

//   async getProfileByValue(username: string) {
//     // const user =
//     const profile = await this.profileRepository.findOne({
//       where: { username },
//     });

//     const user = await this.profileRepository.findByPk(dto.userId);

//     return profile;
//   }
}

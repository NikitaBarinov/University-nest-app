import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AddProfileDto } from "src/profile/dto/add-profile.dto";
import { UsersService } from "src/users/users.service";
import { ChangeProfileDto } from "./dto/change-profile.dto";
import { Profile } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}

  async createProfile(dto: AddProfileDto) {
    const profile = await this.profileRepository.create(dto);

    return profile;
  }

  async changeProfileInfo(dto: ChangeProfileDto) {
    const profile = await this.profileRepository.findByPk(dto.profileId);
    profile.$set("faculty", dto.faculty)
    profile.$set("university", dto.university)
    if(profile.group) {
        if(dto.group) {}
    }
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

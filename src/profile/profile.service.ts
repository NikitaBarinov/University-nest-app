import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AddProfileDto } from "src/profile/dto/add-profile.dto";
import { UsersService } from "src/users/users.service";
import { ChangeProfileDto } from "./dto/change-profile.dto";
import { Profile } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}

  async createProfile(dto: AddProfileDto) {
    const profile = await this.profileRepository.create(dto);

    return profile;
  }

  async changeProfileInfo(dto: ChangeProfileDto) {
    const profile = await this.profileRepository.findByPk(dto.profileId);
    profile.faculty = dto.faculty;
    profile.university = dto.university;
    if (profile.group && dto.group) {
      profile.group = dto.group;
    } else {
      throw new HttpException("Group is not provided", HttpStatus.NOT_FOUND);
    }
    await profile.save();
    return profile;
  }
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AddProfileDto } from "src/profile/dto/add-profile.dto";
import { User } from "src/users/users.model";
import { ChangeProfileDto } from "./dto/change-profile.dto";
import { Profile } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}

  async createProfile(dto: AddProfileDto, userId: number) {
    this.haveAccess(userId, dto.userId);
    const profile = await this.profileRepository.create(dto);

    return profile;
  }

  async changeProfileInfo(dto: ChangeProfileDto, userId: number) {
    const profile = await this.profileRepository.findByPk(dto.profileId);
    this.haveAccess(userId, profile.userId);
    profile.faculty = dto.faculty;
    profile.university = dto.university;
    if ((profile.group && dto.group) || (!profile.group && !dto.group)) {
      profile.group = dto.group;
    } else {
      throw new HttpException("Invalid group", HttpStatus.NOT_FOUND);
    }
    await profile.save();
    return profile;
  }

  async getProfileById(id: number) {
    const profile = await this.profileRepository.findByPk(id);
    return profile;
  }

  async getProfileByFaculty(faculty: string) {
    const profiles = await this.profileRepository.findAndCountAll({
      where: {
        faculty
    }});
    return profiles;
  }

  private haveAccess(userId: number, profileUserId: number) {
    if(userId != profileUserId) {
      throw new HttpException("Have not access", HttpStatus.FORBIDDEN);
    }
  }
}
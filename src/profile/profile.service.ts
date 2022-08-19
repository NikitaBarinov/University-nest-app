import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createRole(dto: CreateProfileDto) {
        const role = await this.profileRepository.create(dto);
        return role;
    }

    async getProfileByValue(username: string) {
        
        const profile = await this.profileRepository.findOne({where: {username}})
        const user = await this.userRepository.findByPk(dto.userId);
        return profile;
    }
}
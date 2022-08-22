import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AddProfileDto } from 'src/profile/dto/add-profile.dto';
import { ChangeProfileDto } from './dto/change-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post('/create')
    create(@Body() dto: AddProfileDto) {
        return this.profileService.createProfile(dto);
    }

    @Post('/update')
    update(@Body() dto: ChangeProfileDto) {
        return this.profileService.changeProfileInfo(dto);
    }
}
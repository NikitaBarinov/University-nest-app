import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AddProfileDto } from 'src/users/dto/add-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post()
    create(@Body() dto: AddProfileDto) {
        return this.profileService.createProfile(dto);
    }
}
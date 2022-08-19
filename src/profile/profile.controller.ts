import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post()
    create(@Body() dto: CreateProfileDto) {
        return this.profileService.createRole(dto);
    }

    @Get('/:username')
    getByUsername(@Param('username') username: string) {
        return this.profileService.getProfileByValue(username);
    }
}
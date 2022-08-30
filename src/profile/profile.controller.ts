import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddProfileDto } from 'src/profile/dto/add-profile.dto';
import { ChangeProfileDto } from './dto/change-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Req() request: any) {
        return this.profileService.createProfile(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    update(@Req() request: any) {
        return this.profileService.changeProfileInfo(request.body, request.user.id);
    }

    @Get('/profile')
    profile(@Body() body: any) {
        return this.profileService.getProfileById(body.id);
    }
}
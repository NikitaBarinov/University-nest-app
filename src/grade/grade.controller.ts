import { Controller, Post, Req } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('Grade')
export class GradeController {
    constructor(private GradeService: GradeService) {}

    // @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Req() request: any) {
        return this.GradeService.createGrade(request.body, request.user.id);
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('/update')
    // update(@Req() request: any) {
    //     return this.profileService.changeProfileInfo(request.body, request.user.id);
    // }
}

import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GradeService } from './grade.service';

@Controller('Grade')
export class GradeController {
    constructor(private GradeService: GradeService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Req() request: any) {
        return this.GradeService.createGrade(request.body, request.user.id);
    }

 
}

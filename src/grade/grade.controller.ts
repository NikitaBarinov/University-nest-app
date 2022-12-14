import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GradeService } from './grade.service';

@Controller('Grade')
export class GradeController {
    constructor(private gradeService: GradeService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Req() request: any) {
        return this.gradeService.createGrade(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    update(@Req() request: any) {
        return this.gradeService.updateGrade(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/averageGradeByStudent')
    averageGradeByStudent(@Req() request: any) {
        return this.gradeService.getAverageGradeByStudent(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/averageGradeByFaculty')
    averageGradeByFaculty(@Req() request: any) {
        return this.gradeService.getAverageGradeByFaculty(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/averageGradeByLesson')
    averageGradeByLesson(@Req() request: any) {
        return this.gradeService.getAverageGradeByLesson(request.body, request.user.id);
    }
 
    @UseGuards(JwtAuthGuard)
    @Get('/averageGradeByGroup')
    averageGradeByGroup(@Req() request: any) {
        return this.gradeService.getAverageGradeByGroup(request.body, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/gradesByProfileAndLesson')
    gradesByProfileAndLesson(@Req() request: any) {
        return this.gradeService.getGradesByProfileAndLesson(request.body, request.user.id);
    }
}

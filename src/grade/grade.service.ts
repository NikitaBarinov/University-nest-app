import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileService } from "src/profile/profile.service";
import { createGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./grade.model";

@Injectable()
export class GradeService {
  constructor(@InjectModel(Grade) private gradeRepository: typeof Grade,
    private profileService: ProfileService) {}

  async createGrade(dto: createGradeDto, userId: number) {
    const teacherProfile = await this.profileService.getProfileById(dto.teacherId);
    const studentProfile = await this.profileService.getProfileById(dto.studentId);

    this.haveAccess(userId, teacherProfile.userId);

    if(!studentProfile.group) {
      throw new HttpException("The profile does not belong to a student", HttpStatus.FORBIDDEN);
    }
    this.compareValues(studentProfile.university, teacherProfile.university);
    this.compareValues(studentProfile.faculty, teacherProfile.faculty);
    
    const grade = await this.gradeRepository.create(dto);

    return grade;
  }

  async updateGrade(dto: UpdateGradeDto, userId: number) {
    let grade = await this.gradeRepository.findByPk(dto.gradeId);
    const teacherProfile = await this.profileService.getProfileById(grade.teacherId);

    this.haveAccess(userId, teacherProfile.userId);

    grade.grade = dto.grade;

    await grade.save();
    return grade;
  }
  
  private haveAccess(userId: number, profileUserId: number) {
    if(userId != profileUserId) {
      throw new HttpException("Have not access", HttpStatus.FORBIDDEN);
    }
  }

  private compareValues(studentValue: string, teacherValue: string) {
    if(teacherValue != studentValue) {
      throw new HttpException("Invalid university or faculty", HttpStatus.BAD_REQUEST);
    }
  }
}
